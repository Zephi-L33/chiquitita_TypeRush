





let hardSentences =
[
"y0u c4n f33l 1t n0w, r1ght? th3 pr355ur, th3 n01$3, th3 qu18 p4n1c 4$ th3 cUr50r w41t5 f0r y0u t0 f41l.",
"g00dn355 gr4c10u5 y0u @r3 th3 0n3 c4u9ht 5t34l1n9 0n th3 cCtv",
"The window drank the explanation and left the question standing in a corner of moving stillness I folded the distance between two words and it turned into a hallway that tastes like unfinished answers.",
"0n3 m0r3 cl1ck & y0u dr0p 1nt0 th3 v01d, wh3re th3 r3d l19ht 1s bl1nk1n9, 1t kn0ws y0u @r3 th3r3, y3t y0u t00k m0r3 th4n y0u n33d3d, n0w y0u c4n't br34th3.",
"th3 curr050r w41t5 f0r y0u t0 f41l a5 y0ur 1d3nt1ty 1s m3lt1n9 l1k3 1c3 0n 4 h0t k3yb04rd.",
"y0u th0ught y0u w3r3 cl3v3r, but y0u w3r3 ju5t c4r3l355 4nd th3 h4llw4y5 t4st3 l1k3 unfin15h3d 4n5w3r5.",
"The clock does not tick as the shadows do not belong to you anymore where the timeline has been fixed and you are trapped in the wrong frame.",
"Y0ur m1nd 15 4 l4byr1nth w1th n0 3x1t.",
"Floor the moving is under feet your end of line the here is got we you finally now.",
"The sixth sick sheik's sixth sheep's sick six sleek slick sickly sticks stick strictly",
"Beware bewildered beavers bewailing big bills",
"Mixed biscuits misshapen massive misshapes",
"Shy gypsy sings pure sparkling hymns",
"Ur n0th1ng but 2nd r4t3, try1ng h4rd c0pyc4t!",
"My br0th3r 1s n0t a p1g! An9 k4p4t1d k0 ay t40, h1nd1 b4b0y d4m0!",
"M4h4l m0 b4 4k0 d4h1l k41l4n94n m0 4k0, 0 k41l4n94n m0 4k0 k4y4 m4h4l m0 4k0?",
"Kun9 m4h4l m0 4k0, b4k1t p1n4p4p1l1 m0 4k0? M4h4l k1t4, p3r0 s4 n4y0n m4s m4h4l k0 4n9 s4r1l1 k0.",
"1 g4v3 y0u 3v3ryth1n9, but u l3ft m3 w1th n0th1n9.",
"1 d3s3rv3 4n 3xpl4n4t10n! 1 d3s3rv3 4n 4cc3pt4bl3 r34s0n!",
"W49 m0n9 s4b1h1n9 m4h4l m0 4k0 kun9 h1nd1 m0 k4y4n9 1p49l4b4n.",
"Amazingly few discotheques provide jukeboxes jackdaws love my big sphinx of quartz five quacking zephyrs jolt my wax bed",
"Public quarrels badly upset private business",
"Woven wire mesh is very stylish indeed crazy children fabricate fantastic jokes",
"Blazing bright brilliant broad blue banners of being browse broiled.",
"Proper copper coffee pot proper copper pot",
"Peculiar wonderful extraordinary phenomena pack my box with five dozen liquor jugs jiving wizard moves quickly",
"The universe is physically inexplicable sphinx of black quartz judge my vow",
"Fuzzy Wuzzy was a bear Fuzzy Wuzzy had no hair",
"Irish wristwatch Swiss wristwatch where greek grapes grab a growl",
"Can you can a can as a canner can can a can",
"big black bug bit a big black bear made him bleed blood",
"How much wood would a woodchuck chuck if a woodchuck could chuck wood"
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










let roundName = "Hard";
let score = 0;
let streak = 0;
let currentSentence = "";
let streakChecker = 0;




let time;
let countdown;




function startGame() {
  score = 0;
  streak = 0;
  roundName = "Hard";


  currentPlayerIndex = 0;


  startTurn();
}






function nextSentence() {
  let listOfTypeInputs = hardSentences;




  currentSentence = listOfTypeInputs[Math.floor(Math.random() * listOfTypeInputs.length)];
  text.textContent = currentSentence;


  input.value = "";
  streak = 0;




  roundDisplay.textContent = "Round:" + roundName;




}






function startTimer() {
  if (roundName === "Hard") time = 10;


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




function saveScore(player, score) {


    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push({ name: player, score: score });
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 10);
   
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}


function endGame() {
    input.disabled = true;
    clearInterval(countdown);


    document.getElementById("greetings").textContent =
        "GAME OVER";


    text.textContent = "All players have finished!";
}


function goBack() {
    window.location.href="selection.html"
}

a