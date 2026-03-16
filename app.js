:root {
  --bg: #09090b;
  --panel: rgba(17, 24, 39, 0.9);
  --panel-2: rgba(31, 41, 55, 0.9);
  --border: rgba(255, 255, 255, 0.08);
  --text: #f3f4f6;
  --muted: #9ca3af;
  --accent: #f97316;
  --accent-2: #fb923c;
  --ok: #22c55e;
  --warn: #f59e0b;
  --danger: #ef4444;
  --shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
}

* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background:
    radial-gradient(circle at top right, rgba(249, 115, 22, 0.16), transparent 22%),
    radial-gradient(circle at left top, rgba(251, 146, 60, 0.12), transparent 18%),
    var(--bg);
  color: var(--text);
}

.app-shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 340px 1fr;
}

.sidebar {
  padding: 24px;
  border-right: 1px solid var(--border);
  background: rgba(3, 7, 18, 0.76);
  backdrop-filter: blur(20px);
}

.main-content {
  padding: 24px;
}

.brand-card,
.panel,
.hero,
.stat-card {
  background: linear-gradient(180deg, rgba(31,41,55,.95), rgba(17,24,39,.92));
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  border-radius: 24px;
}

.brand-card,
.panel { padding: 20px; }
.brand-card { margin-bottom: 18px; }
.panel { margin-bottom: 16px; }
.brand-logo {
  width: 100%;
  max-width: 220px;
  display: block;
  margin-bottom: 16px;
}
.brand-copy, .hero-copy, .info-panel p, .upload-subtitle { color: var(--muted); }

h1, h2, p { margin-top: 0; }
h1 { font-size: 2rem; margin-bottom: 8px; }
h2 { font-size: 1.05rem; margin-bottom: 14px; }
.eyebrow { text-transform: uppercase; letter-spacing: .18em; color: var(--accent-2); font-size: .75rem; margin-bottom: 10px; }

.upload-box {
  display: grid;
  place-items: center;
  padding: 22px;
  border: 1.5px dashed rgba(249, 115, 22, 0.45);
  border-radius: 20px;
  background: rgba(15, 23, 42, 0.58);
  cursor: pointer;
  text-align: center;
}
.upload-box input { display: none; }
.upload-title { font-weight: 700; font-size: 1.05rem; margin-bottom: 6px; }

.button-row { display: flex; gap: 10px; margin-top: 14px; }
.button-row.stacked { flex-direction: column; }
.btn {
  border: 0;
  border-radius: 16px;
  padding: 13px 16px;
  font-weight: 700;
  cursor: pointer;
  transition: transform .15s ease, opacity .15s ease;
}
.btn:hover { transform: translateY(-1px); }
.btn-primary { background: linear-gradient(135deg, var(--accent), var(--accent-2)); color: white; }
.btn-secondary { background: rgba(255,255,255,0.06); color: var(--text); border: 1px solid var(--border); }

.hero {
  padding: 24px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  margin-bottom: 18px;
}
.hero-stats { display: flex; gap: 14px; }
.stat-card { padding: 18px; min-width: 130px; }
.stat-label { color: var(--muted); display: block; margin-bottom: 8px; }
.stat-card strong { font-size: 1.8rem; }

.toolbar {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}
.toolbar input,
.toolbar select,
td input {
  width: 100%;
  background: rgba(17, 24, 39, 0.9);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 12px 14px;
  outline: none;
}
.toolbar select { max-width: 180px; }

.table-panel { padding: 0; overflow: hidden; }
.table-wrap { overflow: auto; }
table { width: 100%; border-collapse: collapse; min-width: 1180px; }
th, td {
  padding: 14px 14px;
  border-bottom: 1px solid var(--border);
  vertical-align: top;
}
th {
  position: sticky;
  top: 0;
  background: rgba(17, 24, 39, 0.98);
  text-align: left;
  font-size: .86rem;
  color: #d1d5db;
}
tr:hover td { background: rgba(255,255,255,0.02); }

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: .8rem;
  font-weight: 700;
}
.badge.ok { background: rgba(34, 197, 94, 0.15); color: #86efac; }
.badge.warn { background: rgba(245, 158, 11, 0.16); color: #fcd34d; }

.message-box {
  margin-top: 16px;
  padding: 14px 16px;
  border-radius: 16px;
  border: 1px solid rgba(249, 115, 22, 0.4);
  background: rgba(124, 45, 18, 0.18);
}
.hidden { display: none; }

.info-panel ul {
  margin: 0 0 12px 18px;
  padding: 0;
  color: #e5e7eb;
}

@media (max-width: 1100px) {
  .app-shell { grid-template-columns: 1fr; }
  .sidebar { border-right: 0; border-bottom: 1px solid var(--border); }
  .hero { flex-direction: column; align-items: flex-start; }
  .hero-stats { width: 100%; }
  .stat-card { flex: 1; }
}
