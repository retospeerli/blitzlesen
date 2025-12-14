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
  start: new Audio("./audio/start.wav"),
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
   Timing
   ========================================================= */
const POST_ANSWER_WAIT_MS = 1000;  // nach Antwort bis neues Wort
const AFTER_HIDE_WAIT_MS  = 1000;  // nach Verschwinden bis Buttons
const ANSWER_TIMEOUT_MS   = 10000; // 10s

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
const countdownEl = document.getElementById("countdown"); // NEU

const choicesEl = document.getElementById("choices");
const feedback = document.getElementById("feedback");

const marker = document.getElementById("marker");
const endScreen = document.getElementById("endScreen");
const bigResult = document.getElementById("bigResult");

/* =========================================================
   State
   ========================================================= */
let wordPool = WORDS_EASY;
let classMode = null;
let showMs = null;

let round = 1;
let playerRounds = 0;
let cpuRounds = 0;

let meterScore = 6;
let correctWord = "";
let locked = false;

let timers = [];
function clearTimers(){ timers.forEach(t=>clearTimeout(t)); timers=[]; }

let answerTimeout = null;
function clearAnswerTimeout(){
  if(answerTimeout){ clearTimeout(answerTimeout); answerTimeout = null; }
}

/* Countdown state */
let countdownTimer = null;
function clearCountdown(){
  if(countdownTimer){ clearInterval(countdownTimer); countdownTimer = null; }
  if(countdownEl) countdownEl.textContent = "";
}
function startCountdown(seconds){
  clearCountdown();
  if(!countdownEl) return;

  let remaining = seconds;
  countdownEl.textContent = `⏳ ${remaining}`;

  countdownTimer = setInterval(() => {
    remaining -= 1;
    if(remaining <= 0){
      countdownEl.textContent = `⏳ 0`;
      clearCountdown(); // Anzeige bleibt leer danach; Timeout wird separat behandelt
      // wir lassen hier nichts auslösen, das macht answerTimeout
      return;
    }
    countdownEl.textContent = `⏳ ${remaining}`;
  }, 1000);
}

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
  scoreInfo.textContent = `🏆 Du ${playerRounds} : ${cpuRounds} CPU`;
}

function setMarker(score){
  const pct = ((score - 1) / 10) * 100;
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
   STRIKTE LOGIK
   ========================================================= */

function startRound(){
  locked = true;
  clearTimers();
  clearAnswerTimeout();
  clearCountdown();
  clearChoices();
  hideEl(endScreen);
  setFeedback("", "");

  meterScore = 6;
  setMarker(meterScore);
  updateHeader();

  nextTask();
}

function nextTask(){
  locked = true;
  clearTimers();
  clearAnswerTimeout();
  clearCountdown();
  clearChoices();
  setFeedback("", "");

  correctWord = pickRandomWord();

  // Wort anzeigen
  wordDisplay.textContent = correctWord;
  phaseHint.textContent = `Merken… (${Math.round(showMs/1000)}s)`;
  clearCountdown();

  // Nach showMs: Wort ausblenden
  timers.push(setTimeout(() => {
    wordDisplay.textContent = "";
    phaseHint.textContent = "Warte… (1s)";
    clearCountdown();
  }, showMs));

  // Nach Verschwinden: 1s warten -> Buttons + Countdown + Timeout
  timers.push(setTimeout(() => {
    phaseHint.textContent = "Wähle die richtige Antwort!";
    renderChoices();
    locked = false;

    // Countdown sichtbar
    startCountdown(Math.ceil(ANSWER_TIMEOUT_MS / 1000));

    // Timeout
    answerTimeout = setTimeout(() => {
      if(locked) return;
      onNoAnswerTimeout();
    }, ANSWER_TIMEOUT_MS);

  }, showMs + AFTER_HIDE_WAIT_MS));
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

function applyDeltaAndContinue(delta){
  meterScore = Math.max(1, Math.min(11, meterScore + delta));
  setMarker(meterScore);

  // Runde entschieden?
  if(meterScore >= 11){
    playerRounds++;
    updateHeader();
    setFeedback("🎉 Runde gewonnen!", "ok");
    playSound("roundwon");
    locked = true;
    disableChoices();
    clearAnswerTimeout();
    clearCountdown();
    timers.push(setTimeout(nextRoundOrGame, 1200));
    return;
  }
  if(meterScore <= 1){
    cpuRounds++;
    updateHeader();
    setFeedback("😿 Runde verloren!", "err");
    playSound("roundlost");
    locked = true;
    disableChoices();
    clearAnswerTimeout();
    clearCountdown();
    timers.push(setTimeout(nextRoundOrGame, 1200));
    return;
  }

  // Weiter: 1s warten + start.wav, dann nächstes Wort
  locked = true;
  disableChoices();
  clearAnswerTimeout();
  clearCountdown();

  playSound("start");
  timers.push(setTimeout(nextTask, POST_ANSWER_WAIT_MS));
}

function onPlayerChoice(chosen){
  if(locked) return;
  locked = true;
  disableChoices();
  clearAnswerTimeout();
  clearCountdown();

  const ok = chosen.toLowerCase() === correctWord.toLowerCase();

  if(ok){
    setFeedback("✅ Richtig! +1", "ok");
    playSound("correct");
    applyDeltaAndContinue(+1);
  } else {
    setFeedback("❌ Falsch! -1", "err");
    playSound("error");
    applyDeltaAndContinue(-1);
  }
}

function onNoAnswerTimeout(){
  locked = true;
  disableChoices();
  clearAnswerTimeout();
  clearCountdown();

  setFeedback("⏱️ Zu langsam! -1", "err");
  playSound("error");
  applyDeltaAndContinue(-1);
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
  clearAnswerTimeout();
  clearCountdown();
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
  clearAnswerTimeout();
  clearCountdown();
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
  resetGameState();
  goGame();
};

/* Init */
setMarker(6);
updateHeader();
updateStartEnabled();
