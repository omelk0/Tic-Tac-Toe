/* Setting up Variables and Getting Elements from HTML */

const board = document.getElementById('tik-tac-toe_board');
const cells = document.querySelectorAll(`[tik-tac-toe_cell-data]`);
const winningMessage = document.getElementById('tik-tac-toe_message');
const winningMessageText = document.getElementById('tik-tac-toe_message-text');
const restartButton = document.getElementById('tik-tac-toe_restart-button');
const xMark = 'tik-tac-toe_cell--x';
const oMark = 'tik-tac-toe_cell--o';
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let circleTurn = false;

/* Starting the Game */

startGame();

function startGame() {
    cells.forEach(cell => {
        // Cleaning Up After Clicking the Restart Button 
        cell.classList.remove(xMark);
        cell.classList.remove(oMark);
        cell.removeEventListener('ckick', handleClick);
        // Setting Up Everything for a New Game
        cell.addEventListener('click', handleClick, { once: true })
    })
    // Setting Up Board Hover Effects for X's and O's
    setBoardHoverClass();
    // Starting a New Game After Clicking the Restart Button
    winningMessage.classList.remove('show');
}

function handleClick(e) {
    let cell = e.target;
    // Ckecking Whos Turn Is It 
    let currentClass = (circleTurn) ? oMark : xMark;
    // Placing X or O depending on the value of currentClass
    placeMark(cell, currentClass);
    // Checking for Win
    if (checkWin(currentClass)) {
        endGame(false)
    // Checking for Draw 
    } else if (isDraw()) {
        endGame(true);
    // If There Is no Win or Draw - Switching Turns 
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function setBoardHoverClass() {
    // Cleaning Up After Each Turn
    board.classList.remove('tik-tac-toe_board--first-turn-x');
    board.classList.remove('tik-tac-toe_board--first-turn-o');
    // // Setting Up Board Hover Effects Depending on Whos Turn Is It
    (circleTurn) ? board.classList.add('tik-tac-toe_board--first-turn-o') : board.classList.add('tik-tac-toe_board--first-turn-x');
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function checkWin(currentClass) {
    // For Each Possible Winning Combination
    return winningCombinations.some(combination => {
        // Check if Every Element of This Combination is Either X or O
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        })
    })
}

function isDraw() {
    // It's Draw If Every Cell Element has Either X or O Class and There Is No Winning Combination
    return [...cells].every(cell => {
        return cell.classList.contains(xMark) || cell.classList.contains(oMark);
    })
}

function endGame(draw) {
    if (draw) {
        winningMessageText.innerText = "Draw!"
    } else {
        winningMessageText.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
    }
    winningMessage.classList.add('show');
}

/* Clicking Restart Button Starts the New Game */
  
restartButton.addEventListener('click', startGame);