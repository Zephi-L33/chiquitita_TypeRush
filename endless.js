// SENTENCES
let easySentences = [
  "small poor boy walk home sit play happy find airplane on ground look like helicopter mom look true hard man fire life rain city.",
  "bird lie time carry many stop will walk big same mom big live even land door hand bend.",
  "know say game clean think eight space wait mom shop name north mean look new good help.",
  "base side sad mouse buy money tax gift rain rough tooth steal point cover trick new rich trade shape bad idea.",
  "good go guess live sick frank read while bad let start cheap dark use step event tooth sock their wait maybe.",
  "list mad dog visit part come sweet dust river stand name layer fast shell feel bring cloth same cream show act give.",
  "normal bad henry place look check picture touch cross will frame sleep farm train idea new smile sorry rate rise use.",
  "the sun is in the sky and the day is warm and bright frame sleep farm train idea new smile sorry rate rise use",
  "mom and dad are at home with the kid all day know say game clean think eight space wait",
  "the dog and the cat run and play in the yard helicopter mom look true hard man fire life rain city.",
  "we eat rice and bread and feel full and good sad mouse buy money tax gift rain rough",
  "i go for a walk then sit down and rest  touch cross will frame sleep farm train idea new smile",
  "i use a book and a pen to read and write  big same mom big live even land door hand bend.",
  "the rain falls and makes the road wet and cold know say game clean think eight space wait",
  "a happy face will smile and laugh out loud rough tooth steal point cover trick new rich",
  "i sleep on my bed and have a good dream play happy find airplane on ground",
  "it is a good day and not a bad one piso cinco bente dyes syete kwarenta otsyenta"
];


let mediumSentences = [
  "quick china human suite stuck ride proud nurse watch false solid human smoke death maria steam urban grass print bound taken.",
  "robin fraud clock carry dozen break shall march thick equal nurse thick exist though ground locked joint peter bent.",
  "aware admit sport henry clean think eight space delay nurse store label north meant watch trend super coach.",
  "basis aside sorry mouse buyer money forte taxes award steam rough teeth theft score cover magic newly elite trade shape enemy thing ideal",
  "great going guess exist dying frank study while worse allow start cheap black usage phase event teeth sock their delay maybe",
  "index angry breed visit piece arise sugar powder river booth smith layer terry speed shell sense bring fiber alike cream event actor yield",
  "usual worse henry place watch check image touch cross shall frame priop sleep rural train ideal trend smile sorry ratio raise usage."
];


let hardSentences = [
  "five fabulous felons fetched fifty fearless firefighters, fixing fragile frogs, flying freakish flamingos, and fascinating fluffy feathers freely.",
  "people would try to discern this sesquipedalian supercalifragilisticexpialidocious obfuscate but echolalia cacophony.",
  "seven shiny ships swiftly sailed southward, seeking sparkling shells, shimmering silver, shooting spectacular, stars and scattering squeaky seagulls loudly.",
  "betty botter bought some butter, but she said the butter's bitter by dipping bat between bitter butter.",
  "How much wood would a woodchuck chuck if a woodchuck could chuck wood in the chuck of wood with chick?",
  "peter piper picked a peck of pickled peppers, packing them perfectly in a pretty pink pail, pouring precise portions for puzzled penguins, pleasing plenty of peppery people.",
  "nine noble narwhals nimbly navigated noisy nooks, nibbling nutty nectarines, noticing nervous nightingales, and nurturing noble notions quietly.",
  "the great grey goat greedily gromped gigantic grapes, gathering gorgeous gems, giving generous gifts, and gazing gleefully."
];


// MIXED MODE
let allSentences = easySentences.concat(mediumSentences, hardSentences);




let text = document.getElementById("text");
let input = document.getElementById("input");
let scoreDisplay = document.getElementById("score");
let timeDisplay = document.getElementById("time");
let streakDisplay = document.getElementById("streak");
let roundDisplay = document.getElementById("lore");


// GAME STATE
let score = 0;
let streak = 0;
let streakChecker = 0;
let currentSentence = "";


let roundLevel = 1; // 1 easy, 2 medium, 3 hard, 4 mixed


let time;
let countdown;


// START GAME
function startGame() {
  score = 0;
  streak = 0;
  streakChecker = 0;
  roundLevel = 1;


  input.disabled = false;
  input.value = "";


  scoreDisplay.textContent = 0;
  streakDisplay.textContent = 0;


  nextSentence();
  startTimer();
}


// DIFFICULTY POOL
function getDifficultyPool() {
  if (roundLevel === 1) return easySentences;
  if (roundLevel === 2) return mediumSentences;
  if (roundLevel === 3) return hardSentences;
  return allSentences;
}


function getRoundName() {
  if (roundLevel === 1) return "Easy";
  if (roundLevel === 2) return "Medium";
  if (roundLevel === 3) return "Hard";
  return "Insane Mix";
}


// NEXT SENTENCE
function nextSentence() {
  let pool = getDifficultyPool();


  currentSentence = pool[Math.floor(Math.random() * pool.length)];
  text.textContent = currentSentence;


  input.value = "";
  streak = 0;


  roundDisplay.textContent = "Round: " + getRoundName();
}


// TIMER (scales with score)
function startTimer() {
  time = Math.max(8, 25 - Math.floor(score / 50));


  clearInterval(countdown);
  updateCountdown();
  countdown = setInterval(updateCountdown, 1000);
}


function updateCountdown() {
  if (time <= 0) {
    timeDisplay.textContent = "0";
    clearInterval(countdown);


    nextSentence();
    startTimer();
    return;
  }


  timeDisplay.textContent = time;
  time--;
}


// INPUT HANDLER
input.addEventListener("input", function () {
  let typed = input.value;
  let sentence = currentSentence;


  let lastIndex = typed.length - 1;
  if (lastIndex < 0) return;


  let typedChar = typed[lastIndex];
  let correctChar = sentence[lastIndex];


  if (typedChar === correctChar) {
    score++;
    streakChecker++;


    if (streakChecker === 5) {
      score += 3;
      streak++;
      streakChecker = 0;
    }


  } else {
    score--;
    streak = 0;
    streakChecker = 0;
  }


  scoreDisplay.textContent = score;
  streakDisplay.textContent = streak;


  // FULL SENTENCE COMPLETE
  if (typed === sentence) {
    nextSentence();
    startTimer();
  }


  checkRound();
});


// PROGRESSION (ENDLESS)
function checkRound() {
  if (score >= 100 && roundLevel === 1) {
    roundLevel = 2;
  }
  else if (score >= 250 && roundLevel === 2) {
    roundLevel = 3;
  }
  else if (score >= 400 && roundLevel === 3) {
    roundLevel = 4; // MIXED FOREVER
  }
}


function redirectPage() {
  window.location.href="selection.html";
}

