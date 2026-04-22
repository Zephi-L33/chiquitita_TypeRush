function showMultiplayer() {
    document.getElementById("singlePlayer").style.display = "none";
    document.getElementById("multiPlayer").style.display = "none";
    document.getElementById("multiSection").style.display = "block";
}

function onConfirm() {
    let numPlayers = Number(document.getElementById("numPlayer").value);

    if (numPlayers) {
        document.querySelector(".numberOfPlayers").style.display = "none";

        let playersDiv = document.querySelector(".playersUser");
        playersDiv.innerHTML = "";

        for (let i = 0; i < numPlayers; i++) {
            let input = `
                <input type="text" id="player-${i}" placeholder="Player ${i + 1}" required> `;
            playersDiv.innerHTML += input;
        }

        playersDiv.innerHTML += ` <br><br><button type="button" onclick="saveUsername()" class="saveButton"></button> `;

        document.querySelector(".container").style.display = "block";
    }
}



function saveUsername() {
    let usernames = [];
    let numPlayers = Number(document.getElementById("numPlayer").value);

    for (let i = 0; i < numPlayers; i++) {
        usernames.push(document.querySelector(`#player-${i}`).value);
    }

    localStorage.setItem("playerAmount", JSON.stringify(numPlayers));
    localStorage.setItem("usernames", JSON.stringify(usernames));
}


//-------------------------------------------------------------------------

function onConfirmSingle() {
    document.querySelector(".numberOfPlayers").style.display = "none";

    let playersDiv = document.querySelector(".playersUser");
    playersDiv.innerHTML = "";

    let input = `
        <input class="usernameBox" type="text" id="player-1" placeholder="Player 1" required>`;

    playersDiv.innerHTML += input;

    playersDiv.innerHTML += `<br> <button type="button" onclick="saveUsernameSingle()" class="saveButton"> </button> `;

    document.querySelector(".container").style.display = "block";
}

function saveUsernameSingle() {
    let usernames = [];
    let numPlayers = 1;

    usernames.push(document.querySelector("#player-1").value);

    localStorage.setItem("playerAmount", JSON.stringify(numPlayers));
    localStorage.setItem("usernames", JSON.stringify(usernames));
}


function checkBeforeProceed() {
    let usernames = JSON.parse(localStorage.getItem("usernames"));
        // if null            if nothing is stored in the array, means that there's no inputs

    
    if (!usernames || usernames.length === 0) {
        alert("Please enter a valid username and save all usernames first!");
        return;
    }

    // got this from google  https://stackoverflow.com/questions/9628879/javascript-regex-username-validation
    let regex = /^[a-zA-Z0-9]{3,12}$/;

    for (let i = 0; i < usernames.length; i++) {
        let name = usernames[i];
        if (!regex.test(name)) {
            alert(`Invalid username for Player ${i + 1}.\nOnly letters/numbers, 3–12 characters.`);
            return;
        }
    }

    window.location.href = "selection.html";
}