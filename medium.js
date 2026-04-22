





let midSentences =[
"Hidden hills held humble homes quietly, as gentle winds whispered through the valleys and soft clouds drifted lazily across the open sky.",
"Soft snow settled silently on sleepy rooftops, covering every corner in a calm white blanket as the quiet night stretched endlessly onward.",
"Quick rain refreshed quiet rural roads at noon, leaving behind shimmering puddles that reflected the pale blue sky above.",
"Rustling reeds rose softly beside resting riverbanks, swaying gently as the slow current carried leaves downstream.",
"Old poems often opened ordinary minds to wonder, inspiring deep thoughts and quiet reflections that lingered long after reading.",
"Natural nights nurtured new dreams under northern skies, where countless stars shimmered brightly in the cool darkness.",
"Merry markets moved merrily during morning harvest hours, filled with cheerful voices, fresh goods, and the scent of warm bread.",
"Long lanterns lit lonely paths through leafy lanes, casting golden glows that danced along the quiet ground.",
"Kind neighbors knocked kindly bringing warm bread baskets, sharing comfort and care during cool and quiet evenings.",
"Joyous bells jingled brightly during joyful winter evenings, echoing through snowy streets as laughter filled the air.",
"Humble homes held hopeful hearts through hard winters, where families stayed strong despite the cold and endless nights.",
"Grand gardens glowed gently during glowing golden sunsets, as petals shimmered softly in the fading light.",
"Fresh forests formed fantastic shelters for forest friends, offering shade, safety, and a peaceful place to rest.",
"Early eagles eyed endless horizons every rising morning, soaring high above mountains and valleys in search of adventure.",
"Deep deserts displayed dazzling dunes beneath distant stars, where silence stretched far beyond the shifting sands.",
"Clever carpenters crafted curved chairs with careful hands, shaping sturdy wood into beautiful and lasting designs.",
"Brisk breezes brushed bright branches beside bubbling brooks, carrying cool air and the soothing sounds of flowing water.",
"Zesty zest filled kitchens during joyful holiday cooking, as laughter and warmth spread through every corner of the home.",
"Young writers yearned yearly for yellowing library pages, eager to discover new worlds hidden within old stories.",
"Warm winds wandered westward across wide wheat fields, gently bending golden stalks under the open sky.",
"Valiant voyagers ventured vast oceans with vivid dreams, chasing distant lands and untold discoveries beyond the horizon.",
"Untamed unicorn legends lingered within unusual ancient books, filled with mysterious tales and forgotten magic.",
"Tall towers touched thin clouds during twilight hours, standing proudly as the sky shifted into shades of dusk.",
"Swift swans swept smoothly across still silver waters, leaving delicate ripples that faded into silence behind them.",
"Shining stars scattered softly across silent night skies, forming endless patterns that sparkled above the world below.",
"Rustic roads reached remote villages beyond rolling hills, guiding travelers through quiet landscapes and peaceful scenes.",
"Quiet rivers rolled slowly through rocky rural regions, carving gentle paths through the land over countless years.",
"Patient pilots planned peaceful paths past powerful storms, navigating carefully through shifting winds and dark clouds.",
"Old oak trees overlooked open orchards every autumn, their leaves falling slowly as the season gently changed.",
"Neat notebooks neatly noted new numbers and narratives, capturing ideas and stories with careful attention.",
"Mighty meteors moved mysteriously through midnight skies, blazing bright trails before fading into the darkness.",
"Lazy lakes mirrored lonely mountains under lingering mist, reflecting the calm beauty of the silent surroundings.",
"Kind kids kept kittens cozy near kitchen corners, creating warm little spaces filled with comfort and care.",
"Joyful journeys joined kind strangers across long railway rides, where stories were shared and friendships quietly formed.",
"Inspired illustrators imagined incredible islands in their journals, sketching distant lands filled with wonder and adventure.",
"Honest helpers handed hot meals to hungry hikers, offering kindness and strength along difficult mountain trails.",
"Glowing gardens grew gently under golden afternoon sunshine, blooming brightly as bees drifted from flower to flower.",
"Friendly farmers fed fluffy sheep beside fertile green hills, tending their land with patience and quiet dedication.",
"Eager engineers examined elegant engines every early morning, ensuring every detail worked smoothly and efficiently.",
"Delightful dancers drifted delicately during dreamy evening concerts, moving gracefully to soft and flowing music.",
"Crisp clouds curled calmly across clear cobalt skies, stretching endlessly above the quiet world below."
]




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










let roundName = "Medium";
let score = 0;
let streak = 0;
let currentSentence = "";
let streakChecker = 0;




let time;
let countdown;




function startGame() {
  score = 0;
  streak = 0;
  roundName = "Medium";


  currentPlayerIndex = 0;


  startTurn();
}






function nextSentence() {
  let listOfTypeInputs = midSentences;




  currentSentence = listOfTypeInputs[Math.floor(Math.random() * listOfTypeInputs.length)];
  text.textContent = currentSentence;


  input.value = "";
  streak = 0;




  roundDisplay.textContent = "Round:" + roundName;




}






function startTimer() {
  if (roundName === "Medium") time = 20;


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

