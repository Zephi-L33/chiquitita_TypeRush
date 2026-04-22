



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
  "it is a good day and not a bad one piso cinco bente dyes syete kwarenta otsyenta",
  "quick china human suite stuck ride proud nurse watch false solid human smoke death maria steam urban grass print bound taken.",
  "robin fraud clock carry dozen break shall march thick equal nurse thick exist though ground locked joint peter bent.",
  "aware admit sport henry clean think eight space delay nurse store label north meant watch trend super coach.",
  "basis aside sorry mouse buyer money forte taxes award steam rough teeth theft score cover magic newly elite trade shape enemy thing ideal",
  "great going guess exist dying frank study while worse allow start cheap black usage phase event teeth sock their delay maybe",
  "index angry breed visit piece arise sugar powder river booth smith layer terry speed shell sense bring fiber alike cream event actor yield",
  "usual worse henry place watch check image touch cross shall frame priop sleep rural train ideal trend smile sorry ratio raise usage.",
  "five fabulous felons fetched fifty fearless firefighters, fixing fragile frogs, flying freakish flamingos, and fascinating fluffy feathers freely.",
  "people would try to discern this sesquipedalian supercalifragilisticexpialidocious obfuscate but echolalia cacophony.",
  "seven shiny ships swiftly sailed southward, seeking sparkling shells, shimmering silver, shooting spectacular, stars and scattering squeaky seagulls loudly.",
  "betty botter bought some butter, but she said the butter's bitter by dipping bat between bitter butter.",
  "How much wood would a woodchuck chuck if a woodchuck could chuck wood in the chuck of wood with chick?",
  "peter piper picked a peck of pickled peppers, packing them perfectly in a pretty pink pail, pouring precise portions for puzzled penguins, pleasing plenty of peppery people.",
  "nine noble narwhals nimbly navigated noisy nooks, nibbling nutty nectarines, noticing nervous nightingales, and nurturing noble notions quietly.",
  "the great grey goat greedily gromped gigantic grapes, gathering gorgeous gems, giving generous gifts, and gazing gleefully.",
  "stop don't freight forwarding services and yellow enemy create even more went full time they will guys but when he cut out it.",
  "send just mute freshman their needle even bought off been debunked tree recruitment cycle end.",
  "added then rectum pneumonoultramicroscopicsilicovolcaniosis readers into refund teaching.",
  "breath often hear burnout lie newly I'll herb museum minutes until after all free speech I'll surely green they uncertain.",
  "when needed emits even nicer list runner move witch must harm breaths keep museum luck buying guys.",
  "keen many men itself then mustn't invent bustle item Karl over been used jewel birth bag verge burn teething every time keep icy.",
  "barbie Ken lush myself busy must stuff over the been thru ignite tunnel idle this the entire isn't unlock.",
  "home live interval kitchens nearly extinct off three needs.",
  "textbook thus is Ive lived lined integers band ingress games knees knee never egress needed lngg ingress unrest."

];


let players = JSON.parse(localStorage.getItem("usernames")) || ["Player1", "Player2"];
let currentPlayerIndex = 0;
let scores = {}; // empty object dictionary, will be used for the leaderboard

for (let i=0; i<players.length; i++){
  scores[players[i]] = 0;
}


let text = document.getElementById("text");
let input = document.getElementById("input");
let scoreDisplay = document.getElementById("score");
let timeDisplay = document.getElementById("time");
let streakDisplay = document.getElementById("streak");
let roundDisplay = document.getElementById("lore");





let roundName = "Easy";
let score = 0;
let streak = 0;
let currentSentence = ""; 
let streakChecker = 0;


let time;
let countdown;


function startGame() {
  score = 0;
  streak = 0;
  roundName = "Easy";

  currentPlayerIndex = 0;

  startTurn(); 
}



function nextSentence() {
  let listOfTypeInputs = easySentences;


  currentSentence = listOfTypeInputs[Math.floor(Math.random() * listOfTypeInputs.length)];
  text.textContent = currentSentence;

  input.value = "";
  streak = 0;


  roundDisplay.textContent = "Round:" + roundName;


}



function startTimer() {
  if (roundName === "Easy") time = 30;

  clearInterval(countdown);

  updateCountdown();
  countdown = setInterval(updateCountdown, 1000);
}



function startTurn() {
    let currentPlayer = players[currentPlayerIndex];

    score = 0;
    streak = 0;
    streakChecker = 0;

    scoreDisplay.textContent = 0;
    streakDisplay.textContent = 0;

    document.getElementById("greetings").textContent =
        currentPlayer + "'s turn";

    input.disabled = false;
    input.value = "";

    nextSentence();
    startTimer();
}


function updateCountdown() {
  if (time <= 0) {
    clearInterval(countdown);
    nextPlayer(); 
    return;
    }
  timeDisplay.textContent = time;
  time--;
}

function startCooldown() {
    let countdownTime = 5;

    input.disabled = true;

    let prevPlayer = players[currentPlayerIndex - 1];
    let nextPlayerName = players[currentPlayerIndex];

    let prepInterval = setInterval(() => {
        document.getElementById("greetings").textContent =
            `GAME OVER ${prevPlayer}! ${nextPlayerName}'s round starts in ${countdownTime}...`;

        countdownTime--;

        if (countdownTime < 0) {
            clearInterval(prepInterval);
            startTurn();
        }
    }, 1000);
}

function nextPlayer() {
    let currentPlayer = players[currentPlayerIndex];


    scores[currentPlayer] += score;
    saveScore(currentPlayer, scores[currentPlayer]);

    currentPlayerIndex++;

    if (currentPlayerIndex >= players.length) {
        endGame();
        return;
    }

    startCooldown(); 
}


input.addEventListener("input", function () {

  let typed = input.value;
  let sentence = currentSentence;

  let lastIndex = typed.length - 1;
  if (lastIndex < 0) return; // prevents idk

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
  }

  scoreDisplay.textContent = score;
  streakDisplay.textContent = streak;

  if (typed === sentence) {
    score += 5;
    nextSentence();
  }

});



function endGame() {
    input.disabled = true;
    clearInterval(countdown);

    document.getElementById("greetings").textContent =
        "GAME OVER";

    text.textContent = "All players have finished!";
}

//------------LEADERBOARD________

function saveScore(player, score) {
    let scores = JSON.parse(localStorage.getItem("scores")) || [];

    scores.push({
        name: player,
        score: score,
    });

    localStorage.setItem("scores", JSON.stringify(scores));
}


function goBack() {
    window.location.href="selection.html"
}