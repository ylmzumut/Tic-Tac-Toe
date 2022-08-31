const statusDisplay = document.querySelector('.result');
const displayRestart = document.querySelector('.restart');
const displayTitle = document.querySelector('.mainTitle');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

var elementX = document.getElementById("playerX");
var elementO = document.getElementById("playerO");

const winners = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

var currentPlayerTurn = () => currentPlayer == 'X';
if (currentPlayer == 'X') {
    elementO.classList.remove("current");
    elementX.classList.add("current")
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (currentPlayer == 'X') {
        elementO.classList.remove("current");
        elementX.classList.add("current")
    }
    else {
        elementX.classList.remove("current");
        elementO.classList.add("current")
    }
}

function handleResultValidation() {
    let win = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winners[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            win = true;
            break
        }
    }

    if (win) {
        statusDisplay.innerHTML = winMessage();
        gameActive = false;
        return;
    }

    let draw = !gameState.includes("");
    if (draw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    elementO.classList.remove("current");
        elementX.classList.add("current")
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = "";
    document.querySelectorAll('.xox').forEach(cell => cell.innerHTML = "");
}

function turkishText() {
    winMessage = () => `${currentPlayer} KAZANDI!`;
    drawMessage = () => `OYUN BERABERE!`;
    displayRestart.innerHTML = "YENIDEN BASLAT";
    displayTitle.innerHTML = "X-O-X";
}

function englishText() {
    winMessage = () => `${currentPlayer} HAS WİN!`;
    drawMessage = () => `GAME DRAW!`;
    displayRestart.innerHTML = "RESTART";
    displayTitle.innerHTML = "TIC-TAC-TOE";
}

document.querySelectorAll('.xox').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestartGame);

var turkish = document.getElementById("tr"),
    english = document.getElementById("en");

turkish.addEventListener("click", function () {
    change(turkish, english);
}, false
);

english.addEventListener("click", function () {
    change(english, turkish);
}, false
);

function change(lang_on, lang_off1) {
    if (!lang_on.classList.contains("current_lang")) {
        lang_on.classList.add("current_lang");
        lang_off1.classList.remove("current_lang");
    }
    if (lang_on.innerHTML == "TR") {
        turkishText();
        handleRestartGame();
    }
    else if (lang_on.innerHTML == "EN") {
        englishText();
        handleRestartGame();
    }
}
const changeLang = (languageCode) => {
    document.documentElement.setAttribute("lang", languageCode);
};