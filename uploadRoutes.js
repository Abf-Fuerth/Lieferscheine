# Fachlogik

## Excel-Spalten
- lfd.Nr
- Datum
- Abfallart
- Erzeuger/Transporteur
- Tonnage
- Abl.Ort
- KFZ-Nr
- Anzahl Lieferscheine
- Status
- Belegnummer
- Quelldatei

## Erkennung

### Papier
Schlüsselwörter:
- Papier und Pappe
- Altpapier
- Veolia
- Eingangswiegeschein

Regeln:
- Datum aus `Ausführungsdatum`
- KFZ aus `Kfz`
- Gewicht aus `NettoC` / `Netto`
- Abl.Ort = `Veolia Hafenstraße`

### Sperrmüll
Schlüsselwörter:
- Sperrmüll
- Abfallschl. 200307
- Müllverbrennungsanlage

Regeln:
- Datum aus `Datum:`
- KFZ aus `Transponder-Nr`
- Gewicht aus `NETTO`
- Abl.Ort = `Müllverbrennungsanlage Nürnberg`

### Hausmüll
Schlüsselwörter:
- Hausmüll
- gemischte Siedlungsabfälle
- Abfallschl. 200301

Regeln:
- Datum aus `Datum:`
- KFZ aus `Transponder-Nr`
- Gewicht aus `NETTO`
- Abl.Ort = `Müllverbrennungsanlage Nürnberg`

### Biomüll
Schlüsselwörter:
- Biomüll
- Kompostplatz Burgfarrnbach

Regeln:
- KFZ aus `Fahrzeug`
- Tonnage wenn möglich aus handschriftlichem Bereich
- wenn nicht sicher: Status = `Prüfen`
- Abl.Ort = `Kompostplatz Burgfarrnbach`
