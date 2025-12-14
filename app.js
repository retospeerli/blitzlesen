/* =========================================================
   Wortlisten (aus deinem letzten Output)
   ========================================================= */
const LIST_DER = [
  "Hund","Kater","Hase","Fuchs","Bär","Löwe","Affe","Vogel","Spatz","Adler","Fisch","Wal","Hai","Delfin","Igel","Hamster","Esel","Hahn","Stier","Bock","Wolf","Tiger","Elefant","Drache","Wurm","Käfer","Schmetterling","Marienkäfer","Regenwurm","Käfig","Baum","Ast","Strauch","Busch","Wald","Berg","See","Fluss","Bach","Weg","Garten","Hof","Park","Spielplatz","Strand","Schnee","Regen","Wind","Nebel","Stern","Mond","Himmel","Tag","Abend","Morgen","Sommer","Winter","Herbst","Frühling","Januar","Ball","Stein","Stock","Besen","Eimer","Becher","Teller","Löffel","Topf","Herd","Ofen","Tisch","Stuhl","Schrank","Teppich","Schlüssel","Stift","Bleistift","Pinsel","Kleber","Radiergummi","Rucksack","Koffer","Mantel","Pullover","Schal","Hut","Schuh","Stiefel","Socken","Gürtel","Knopf","Zug","Bus","Roller","Traktor","Hafen","Markt","Arzt","Freund"
];

const LIST_DIE = [
  "Katze","Maus","Ente","Gans","Kuh","Ziege","Puppe","Biene","Fliege","Spinne","Ameise","Raupe","Schlange","Schildkröte","Krabbe","Qualle","Schnecke","Eule","Taube","Krähe","Schule","Klasse","Lehrerin","Tafel","Kreide","Uhr","Tasche","Mappe","Schere","Farbe","Linie","Seite","Zahl","Frage","Antwort","Pause","Stunde","Woche","Ferien","Note","Hand","Nase","Lippe","Zunge","Wange","Stirn","Schulter","Hüfte","Haut","Ferse","Jacke","Hose","Mütze","Kappe","Brille","Socke","Bluse","Blume","Rose","Tulpe","Wiese","Erde","Sonne","Wolke","Luft","Nacht","Ecke","Mitte","Treppe","Tür","Wand","Decke","Lampe","Küche","Stube","Badewanne","Dusche","Seife","Bürste","Zahnbürste","Flasche","Tasse","Gabel","Pfanne","Suppe","Banane","Birne","Traube","Erdbeere","Karotte","Kartoffel","Tomate","Gurke","Pizza","Butter","Milch","Wurst","Post","Straße","Brücke"
];

const LIST_DAS = [
  "Kind","Baby","Mädchen","Buch","Heft","Blatt","Bild","Wort","Lied","Spiel","Haus","Zimmer","Bett","Kissen","Fenster","Dach","Tor","Auto","Fahrrad","Boot","Schiff","Flugzeug","Rad","Feuer","Wasser","Eis","Salz","Brot","Brötchen","Müsli","Obst","Gemüse","Ei","Mehl","Öl","Glas","Messer","Lineal","Papier","Geschenk","Geld","Ticket","Paket","Telefon","Handy","Radio","Licht","Foto","Video","Kabel","Tier","Pferd","Schaf","Schwein","Huhn","Kalb","Zebra","Kamel","Krokodil","Kaninchen","Meer","Feld","Dorf","Land","Wetter","Gewitter","Laub","Holz","Gras","Tal","Jahr","Datum","Ende","Ziel","Loch","Seil","Band","Tuch","Zeug","Bettlaken","Essen","Trinken","Frühstück","Mittagessen","Abendbrot","Bad","Sofa","Regal","Schloss","Kino","Büro","Museum","Krankenhaus","Hotel","Rathaus","Stadion","Abenteuer","Geheimnis","Rätsel","Signal"
];

function dedupe(arr){
  const m = new Map();
  for(const w of arr){
    const k = String(w).trim().toLowerCase();
    if(!k) continue;
    if(!m.has(k)) m.set(k, w);
  }
  return [...m.values()];
}

const WORDS_FULL = dedupe([...LIST_DER, ...LIST_DIE, ...LIST_DAS]);

const WORDS_EASY = dedupe([
  "Hund","Katze","Maus","Ente","Gans","Kuh","Ziege","Bär","Fisch","Vogel","Eule",
  "Ball","Baum","Haus","Tor","Brot","Saft","Hand","Mund","Nase","Auge","Ohr","Zahn",
  "Tisch","Bank","Stuhl","Tasse","Becher","Teller","Apfel","Birne","Reis","Suppe","Wasser",
  "Stern","Mond","Regen","Wind","Wald","Weg","Berg","Sand","Stein","Gras",
  "Buch","Heft","Blatt","Bild","Wort","Lied","Spiel","Kind","Baby","Bett","Kissen","Fenster","Auto","Rad",
  "Feuer","Eis","Ei","Glas","Messer","Papier","Geld","Handy","Licht","Foto"
]);

/* =========================================================
   Audio
   ========================================================= */
const SND = {
  correct: new Audio("./audio/correct.wav"),
  error: new Audio("./audio/error.wav"),
  roundwon: new Audio("./audio/roundwon.wav"),
  roundlost: new Audio("./audio/roundlost.wav"),
  gamewon: new Audio("./audio/gamewon.wav"),
  gamelost: new Audio("./audio/gamelost.wav")
};

async function playSound(name){
  const a = SND[name];
  if(!a) return;
  try{
    a.currentTime = 0;
    await a.play();
  }catch(e){}
}

/* =========================================================
   DOM
   ========================================================= */
const menu = document.getElementById("menu");
const game = document.getElementById("game");

const class2 = document.getElementById("class2");
const class3 = document.getElementById("class3");

const diffHard = document.getElementById("diffHard");
const diffMid  = document.getElementById("diffMid");
const diffEasy = document.getElementById("diffEasy");

const startBtn = document.getElementById("start");
const backToMenu = document.getElementById("backToMenu");
const playAgain = document.getElementById("playAgain");

const roundInfo = document.getElementById("roundInfo");
const scoreInfo = document.getElementById("scoreInfo");

const wordDisplay = document.getElementById("wordDisplay");
const phaseHint = document.getElementById("phaseHint");

const choicesEl = document.getElementById("choices");
const feedback = document.getElementById("feedback");

const marker = document.getElementById("marker");
const endScreen = document.getElementById("endScreen");
const bigResult = document.getElementById("bigResult");

/* =========================================================
   State
   ========================================================= */
let wordPool = WORDS_EASY;
let classMode = null;  // "2"|"3"
let showMs = null;     // 1000|3000|5000

let round = 1;         // 1..7
let playerRounds = 0;
let cpuRounds = 0;

let meterScore = 6;    // 1..11, start 6
let correctWord = "";
let locked = false;

let timers = [];
function clearTimers(){ timers.forEach(t=>clearTimeout(t)); timers=[]; }

function showEl(el){ el.classList.remove("hidden"); }
function hideEl(el){ el.classList.add("hidden"); }

function setSelected(btn, group){
  group.forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
}

function updateStartEnabled(){
  startBtn.disabled = !(classMode && showMs);
}

function updateHeader(){
  roundInfo.textContent = `🏁 Runde ${round} / 7`;
  // FIX: klare Rundenanzeige als 1:0 etc
  scoreInfo.textContent = `🏆 Du ${playerRounds} : ${cpuRounds} CPU`;
}

function setMarker(score){
  const pct = ((score - 1) / 10) * 100; // 1..11 -> 0..100
  marker.style.left = `${pct}%`;
}

function shuffle(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]] = [a[j],a[i]];
  }
  return a;
}

function pickRandomWord(){
  return wordPool[Math.floor(Math.random()*wordPool.length)];
}

function makeChoices(correct){
  const seen = new Set([correct.toLowerCase()]);
  const out = [correct];
  while(out.length < 6){
    const w = pickRandomWord();
    const k = w.toLowerCase();
    if(!seen.has(k)){
      seen.add(k);
      out.push(w);
    }
  }
  return shuffle(out);
}

function setFeedback(text, type){
  feedback.textContent = text;
  feedback.className = "feedback " + (type || "");
}

function disableChoices(){
  [...choicesEl.querySelectorAll("button")].forEach(b => b.disabled = true);
}

function clearChoices(){
  choicesEl.innerHTML = "";
}

/* =========================================================
   WICHTIG: Logik
   - meterScore wird NUR zu Beginn einer neuen Runde auf 6 gesetzt
   - innerhalb der Runde verändert er sich pro Frage (+/-)
   ========================================================= */

function startRound(){
  locked = true;
  clearTimers();
  clearChoices();
  hideEl(endScreen);
  setFeedback("", "");

  // FIX: Reset nur hier!
  meterScore = 6;
  setMarker(meterScore);
  updateHeader();

  nextTaskInSameRound();
}

function nextTaskInSameRound(){
  locked = true;
  clearTimers();
  clearChoices();
  setFeedback("", "");

  correctWord = pickRandomWord();

  // Wort anzeigen
  wordDisplay.textContent = correctWord;
  phaseHint.textContent = `Merken… (${Math.round(showMs/1000)}s)`;

  // Nach showMs: Wort ausblenden
  timers.push(setTimeout(() => {
    wordDisplay.textContent = "";
    phaseHint.textContent = "Warte… (2s)";
  }, showMs));

  // Exakt 2s später: Buttons anzeigen
  timers.push(setTimeout(() => {
    phaseHint.textContent = "Wähle die richtige Antwort!";
    renderChoices();
    locked = false;
  }, showMs + 2000));
}

function renderChoices(){
  clearChoices();
  const choices = makeChoices(correctWord);
  choices.forEach(w => {
    const b = document.createElement("button");
    b.className = "choice";
    b.textContent = w;
    b.onclick = () => onPlayerChoice(w);
    choicesEl.appendChild(b);
  });
}

function onPlayerChoice(chosen){
  if(locked) return;
  locked = true;
  disableChoices();

  const ok = chosen.toLowerCase() === correctWord.toLowerCase();

  if(ok){
    setFeedback("✅ Richtig! +1", "ok");
    playSound("correct");
    meterScore = Math.min(11, meterScore + 1);
  } else {
    setFeedback("❌ Falsch! -1", "err");
    playSound("error");
    meterScore = Math.max(1, meterScore - 1);
  }
  setMarker(meterScore);

  timers.push(setTimeout(cpuTurn, 650));
}

function cpuTurn(){
  const cpuCorrectChance = 0.55;
  const cpuOk = Math.random() < cpuCorrectChance;

  if(cpuOk){
    meterScore = Math.max(1, meterScore - 1);   // CPU zieht Richtung 1
  } else {
    meterScore = Math.min(11, meterScore + 1);  // CPU patzt
  }
  setMarker(meterScore);

  if(meterScore <= 1){
    cpuRounds++;
    updateHeader();
    setFeedback("CPU gewinnt die Runde 🟥", "err");
    playSound("roundlost");
    timers.push(setTimeout(nextRoundOrGame, 1200));
    return;
  }

  if(meterScore >= 11){
    playerRounds++;
    updateHeader();
    setFeedback("Du gewinnst die Runde 🟦", "ok");
    playSound("roundwon");
    timers.push(setTimeout(nextRoundOrGame, 1200));
    return;
  }

  // FIX: nächste Frage derselben Runde – OHNE Reset
  timers.push(setTimeout(nextTaskInSameRound, 700));
}

function nextRoundOrGame(){
  if(playerRounds >= 4){
    gameOver(true);
    return;
  }
  if(cpuRounds >= 4){
    gameOver(false);
    return;
  }

  round = Math.min(7, round + 1);
  startRound();
}

function gameOver(playerWon){
  locked = true;
  clearTimers();
  clearChoices();
  wordDisplay.textContent = "";
  phaseHint.textContent = "";

  showEl(endScreen);
  if(playerWon){
    bigResult.textContent = `🏆 Du hast gewonnen! (${playerRounds}:${cpuRounds})`;
    playSound("gamewon");
  } else {
    bigResult.textContent = `😿 CPU hat gewonnen. (${playerRounds}:${cpuRounds})`;
    playSound("gamelost");
  }
}

/* =========================================================
   Menu / Controls
   ========================================================= */
function resetGameState(){
  clearTimers();
  locked = false;

  round = 1;
  playerRounds = 0;
  cpuRounds = 0;

  meterScore = 6;
  setMarker(6);

  updateHeader();
  clearChoices();
  setFeedback("", "");
  hideEl(endScreen);

  wordDisplay.textContent = "";
  phaseHint.textContent = "";
}

function goMenu(){
  hideEl(game);
  showEl(menu);
  resetGameState();
}

function goGame(){
  hideEl(menu);
  showEl(game);
  resetGameState();
  startRound();
}

class2.onclick = () => {
  classMode = "2";
  wordPool = WORDS_EASY;
  setSelected(class2, [class2, class3]);
  updateStartEnabled();
};

class3.onclick = () => {
  classMode = "3";
  wordPool = WORDS_FULL;
  setSelected(class3, [class2, class3]);
  updateStartEnabled();
};

diffHard.onclick = () => {
  showMs = 1000;
  setSelected(diffHard, [diffHard, diffMid, diffEasy]);
  updateStartEnabled();
};
diffMid.onclick = () => {
  showMs = 3000;
  setSelected(diffMid, [diffHard, diffMid, diffEasy]);
  updateStartEnabled();
};
diffEasy.onclick = () => {
  showMs = 5000;
  setSelected(diffEasy, [diffHard, diffMid, diffEasy]);
  updateStartEnabled();
};

startBtn.onclick = () => {
  playSound("correct"); // audio unlock
  goGame();
};

backToMenu.onclick = () => goMenu();

playAgain.onclick = () => {
  // Einstellungen behalten, neues Match
  resetGameState();
  goGame();
};

/* Init */
setMarker(6);
updateHeader();
updateStartEnabled();
