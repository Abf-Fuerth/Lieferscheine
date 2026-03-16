const state = {
  records: [],
};

const elements = {
  pdfInput: document.getElementById('pdfInput'),
  analyzeBtn: document.getElementById('analyzeBtn'),
  clearBtn: document.getElementById('clearBtn'),
  excelBtn: document.getElementById('excelBtn'),
  jsonBtn: document.getElementById('jsonBtn'),
  recordsTable: document.getElementById('recordsTable'),
  recordCount: document.getElementById('recordCount'),
  reviewCount: document.getElementById('reviewCount'),
  searchInput: document.getElementById('searchInput'),
  statusFilter: document.getElementById('statusFilter'),
  messageBox: document.getElementById('messageBox'),
};

function showMessage(message, isError = false) {
  elements.messageBox.textContent = message;
  elements.messageBox.classList.remove('hidden');
  elements.messageBox.style.borderColor = isError ? 'rgba(239,68,68,.45)' : 'rgba(249,115,22,.4)';
  elements.messageBox.style.background = isError ? 'rgba(127,29,29,.25)' : 'rgba(124,45,18,.18)';
}

function clearMessage() {
  elements.messageBox.classList.add('hidden');
  elements.messageBox.textContent = '';
}

function saveLocal() {
  localStorage.setItem('abfue-records', JSON.stringify(state.records));
}

function loadLocal() {
  const raw = localStorage.getItem('abfue-records');
  if (!raw) return;
  try {
    state.records = JSON.parse(raw);
    renderTable();
  } catch {
    localStorage.removeItem('abfue-records');
  }
}

function updateStats(filtered) {
  elements.recordCount.textContent = String(filtered.length);
  elements.reviewCount.textContent = String(filtered.filter((r) => r.status === 'Prüfen').length);
}

function getFilteredRecords() {
  const q = elements.searchInput.value.trim().toLowerCase();
  const status = elements.statusFilter.value;
  return state.records.filter((record) => {
    const hay = Object.values(record).join(' ').toLowerCase();
    const statusOk = status === 'alle' || record.status === status;
    const queryOk = !q || hay.includes(q);
    return statusOk && queryOk;
  });
}

function onCellEdit(index, key, value) {
  state.records[index][key] = value;
  saveLocal();
  renderTable();
}

function renderTable() {
  const records = getFilteredRecords();
  elements.recordsTable.innerHTML = '';

  records.forEach((record) => {
    const realIndex = state.records.findIndex((r) => r.quelle === record.quelle && r.belegnummer === record.belegnummer && r.abfallart === record.abfallart);
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${record.lfdNr ?? ''}</td>
      <td><input value="${record.datum ?? ''}" data-key="datum" /></td>
      <td><input value="${record.abfallart ?? ''}" data-key="abfallart" /></td>
      <td><input value="${record.erzeugerTransporteur ?? ''}" data-key="erzeugerTransporteur" /></td>
      <td><input value="${record.tonnage ?? ''}" data-key="tonnage" /></td>
      <td><input value="${record.ablOrt ?? ''}" data-key="ablOrt" /></td>
      <td><input value="${record.kfzNr ?? ''}" data-key="kfzNr" /></td>
      <td><input value="${record.anzahlLieferscheine ?? 1}" data-key="anzahlLieferscheine" /></td>
      <td><span class="badge ${record.status === 'OK' ? 'ok' : 'warn'}">${record.status}</span></td>
      <td><input value="${record.belegnummer ?? ''}" data-key="belegnummer" /></td>
      <td>${record.quelle ?? ''}</td>
    `;

    tr.querySelectorAll('input').forEach((input) => {
      input.addEventListener('change', (event) => {
        const { key } = event.target.dataset;
        onCellEdit(realIndex, key, event.target.value);
      });
    });

    elements.recordsTable.appendChild(tr);
  });

  updateStats(records);
}

async function analyzeFiles() {
  clearMessage();
  const files = elements.pdfInput.files;
  if (!files || files.length === 0) {
    showMessage('Bitte zuerst mindestens eine PDF auswählen.', true);
    return;
  }

  const formData = new FormData();
  Array.from(files).forEach((file) => formData.append('files', file));

  elements.analyzeBtn.disabled = true;
  elements.analyzeBtn.textContent = 'Erkenne…';

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Upload fehlgeschlagen');

    const data = await response.json();
    const next = data.records || [];
    const start = state.records.length;
    next.forEach((record, idx) => {
      state.records.push({ ...record, lfdNr: start + idx + 1 });
    });
    saveLocal();
    renderTable();
    showMessage(`${next.length} Einträge erkannt und angehängt.`);
  } catch (error) {
    console.error(error);
    showMessage('Die PDF-Erkennung ist fehlgeschlagen. Prüfe bitte Serverstart und PDF-Datei.', true);
  } finally {
    elements.analyzeBtn.disabled = false;
    elements.analyzeBtn.textContent = 'Erkennen';
  }
}

async function exportExcel() {
  clearMessage();
  if (state.records.length === 0) {
    showMessage('Es gibt noch keine Datensätze zum Export.', true);
    return;
  }

  const response = await fetch('/api/export/xlsx', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ records: state.records }),
  });

  if (!response.ok) {
    showMessage('Excel-Export fehlgeschlagen.', true);
    return;
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'abfue-lieferscheine.xlsx';
  a.click();
  URL.revokeObjectURL(url);
}

function exportJson() {
  const blob = new Blob([JSON.stringify(state.records, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'abfue-lieferscheine.json';
  a.click();
  URL.revokeObjectURL(url);
}

function clearAll() {
  state.records = [];
  elements.pdfInput.value = '';
  saveLocal();
  renderTable();
  clearMessage();
}

elements.analyzeBtn.addEventListener('click', analyzeFiles);
elements.excelBtn.addEventListener('click', exportExcel);
elements.jsonBtn.addEventListener('click', exportJson);
elements.clearBtn.addEventListener('click', clearAll);
elements.searchInput.addEventListener('input', renderTable);
elements.statusFilter.addEventListener('change', renderTable);

loadLocal();
renderTable();
