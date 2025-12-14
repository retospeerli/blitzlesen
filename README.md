# 🧠 Wort-Merkspiel (1.–3. Klasse)

Ein kindgerechtes Merk- und Auswahlspiel für den Leseunterricht in der **1. bis 3. Klasse**.  
Die App läuft **vollständig im Browser** (HTML + JavaScript) und kann direkt über **GitHub Pages** genutzt werden – **ohne Server, ohne Login, ohne Installation**.

---

## 🎯 Lernziele
- Wörter **kurzzeitig merken**
- Wörter **visuell wiedererkennen**
- Lesesicherheit & Konzentration fördern
- Spielerisches Üben im Klassen- und Förderunterricht

---

## 🎮 Spielprinzip

1. Ein Wort wird für **1 / 3 / 5 Sekunden** angezeigt  
2. Das Wort verschwindet  
3. Nach **1 Sekunde** erscheinen **6 Wörter** zur Auswahl  
4. Das richtige Wort muss **innerhalb von 10 Sekunden** ausgewählt werden  

### Punkte pro Runde
- **Richtig:** +1 Punkt  
- **Falsch oder keine Antwort:** −1 Punkt  
- **Start jeder Runde:** 6 Punkte  
- **11 Punkte:** Spieler gewinnt die Runde  
- **1 Punkt:** CPU gewinnt die Runde  

### Spielende
- **Best of 7**
- Wer zuerst **4 Runden** gewinnt, gewinnt das Spiel

---

## 🧩 Klassenstufen

- **2. Klasse**  
  → vereinfachte Wortliste (kurze, sehr häufige Nomen)

- **3. Klasse**  
  → vollständige Wortliste (größerer Wortschatz)

---

## 🔊 Audio

Im Ordner `/audio` liegen alle Soundeffekte als `.wav`-Dateien:

- `start.wav` – neue Aufgabe beginnt  
- `correct.wav` – richtige Antwort  
- `error.wav` – falsche oder zu langsame Antwort  
- `roundwon.wav` – Runde gewonnen  
- `roundlost.wav` – Runde verloren  
- `gamewon.wav` – Spiel gewonnen  
- `gamelost.wav` – Spiel verloren  

> Alle Sounds sind optional, erhöhen aber Motivation und Verständlichkeit deutlich.

---

## 🧠 Wortlisten anpassen oder erweitern

### 📄 Datei: `app.js`

Ganz oben in der Datei befinden sich die Wortlisten:

```js
const LIST_DER = [ ... ];
const LIST_DIE = [ ... ];
const LIST_DAS = [ ... ];
