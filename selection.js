// ---------------OPEN TUTORIAL---------------------

const openBtn = document.getElementById("openTutorial");
const closeBtn = document.getElementById("closeTutorial");
const modal = document.getElementById("tutorial");
const pages = document.querySelectorAll(".tutorialPage");

let page = 0;

openBtn.addEventListener("click" , () => {
    modal.classList.add("open");
});

closeBtn.addEventListener("click" , () => {
    modal.classList.remove("open");
});

document.getElementById("nextPage").onclick = () => {
    if (page < pages.length - 1) {
        pages[page].classList.remove("active");
        page++;
        pages[page].classList.add("active");
    }
};

document.getElementById("prevPage").onclick = () => {
    if (page > 0) {
        pages[page].classList.remove("active");
        page--;
        pages[page].classList.add("active");
    }
};

// ---------------OPEN PICK GAMEMODE---------------------

const openBtnMode = document.getElementById("openGameModePage");
const closeBtnMode = document.getElementById("closeGameModePage");
const GameModemodal = document.getElementById("mode");
const Modepages = document.querySelectorAll(".gameModePage");

openBtnMode.addEventListener("click", () => {
    GameModemodal.classList.add("open");
});

closeBtnMode.addEventListener("click", () => {
    GameModemodal.classList.remove("open");
});


function getUsernames() {
    const playerNum = JSON.parse(localStorage.getItem("playerAmount"));
    const usernames = JSON.parse(localStorage.getItem("usernames"));

    const container = document.querySelector(".generateUsernames");
    container.innerHTML = "";

    if (!usernames || !playerNum) return;

    for (let i = 0; i < playerNum; i++) {
        container.innerHTML += `${usernames[i]}<br>`;
    }
}

window.onload = getUsernames;