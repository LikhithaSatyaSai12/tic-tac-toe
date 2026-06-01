let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const statusText = document.getElementById("status");
const cells = document.querySelectorAll(".cell");

const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// PLAYER MOVE (X)
cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const index = cell.getAttribute("data-index");

        if (board[index] !== "" || !gameActive) return;

        makeMove(index, "X");

        if (gameActive) {
            statusText.textContent = "Computer is thinking...";
            setTimeout(computerMove, 500);
        }
    });
});

function makeMove(index, player) {
    board[index] = player;
    cells[index].textContent = player;

    checkWinner(player);
}

// 🤖 COMPUTER MOVE (O)
function computerMove() {
    if (!gameActive) return;

    // 1. Try to win
    let move = findBestMove("O");

    // 2. Block player
    if (move === -1) move = findBestMove("X");

    // 3. Random move
    if (move === -1) {
        let empty = board
            .map((val, i) => val === "" ? i : null)
            .filter(v => v !== null);

        move = empty[Math.floor(Math.random() * empty.length)];
    }

    makeMove(move, "O");

    if (gameActive) {
        statusText.textContent = "Your turn (X)";
    }
}

// 🧠 Find winning/blocking move
function findBestMove(player) {
    for (let condition of winConditions) {
        let [a, b, c] = condition;

        let line = [board[a], board[b], board[c]];

        if (line.filter(v => v === player).length === 2 &&
            line.includes("")) {

            if (board[a] === "") return a;
            if (board[b] === "") return b;
            if (board[c] === "") return c;
        }
    }
    return -1;
}

// 🏆 WIN CHECK
function checkWinner(player) {
    for (let condition of winConditions) {
        let [a, b, c] = condition;

        if (board[a] === player &&
            board[b] === player &&
            board[c] === player) {

            statusText.textContent =
                player === "X" ? "You Win 🎉" : "Computer Wins 🤖";

            gameActive = false;
            return;
        }
    }

    if (!board.includes("")) {
        statusText.textContent = "Draw 🤝";
        gameActive = false;
    }
}

// 🔄 RESET FUNCTION
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;

    cells.forEach(cell => cell.textContent = "");

    statusText.textContent = "Your turn (X)";
}