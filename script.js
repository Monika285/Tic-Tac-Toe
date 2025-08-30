const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");
let board = Array(9).fill("");
let currentPlayer = "X";
let gameActive = true;

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6]             // diagonals
];

function createBoard() {
  boardElement.innerHTML = "";
  board.forEach((_, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = index;
    cell.addEventListener("click", handleCellClick);
    boardElement.appendChild(cell);
  });
}

function handleCellClick(event) {
  const index = event.target.dataset.index;
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusElement.textContent = `🎉 Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    statusElement.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusElement.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
  return winningCombinations.some(combination => {
    return combination.every(index => board[index] === currentPlayer);
  });
}

function restartGame() {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;
  statusElement.textContent = `Player X's Turn`;
  createBoard();
}

createBoard();
