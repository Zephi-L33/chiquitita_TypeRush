let scores = JSON.parse(localStorage.getItem("scores")) || [];

const SCORECOUNT = scores.length;

for (let i = 0; i < SCORECOUNT; i++) {
    let maxIndex = i;

    for (let j = i + 1; j < SCORECOUNT; j++) {
        if (scores[j].score > scores[maxIndex].score) {
            maxIndex = j;
        }
    }

    if (maxIndex !== i) {
        [scores[i], scores[maxIndex]] = [scores[maxIndex], scores[i]];
    }
}


let container = document.getElementById("leaderboardNames");
container.innerHTML = "";

for (let i = 0; i < scores.length; i++) {
    container.innerHTML += `${i + 1}. ${scores[i].name} - ${scores[i].score}<br>`;
}

//clear leaderboard

function clearScores() {
    localStorage.removeItem("scores");
    location.reload();
}

function toHome(){
    window.location.href = "selection.html";
}