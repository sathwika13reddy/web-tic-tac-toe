let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;
let gameMode = "hvh"; // default
let player1 = "", player2 = "";

// DOM elements
const statusText = document.getElementById("statusText");
const boardCells = document.querySelectorAll(".cell");
const modeContainer = document.getElementById("modeContainer");
const playerContainer = document.getElementById("playerContainer");
const gameContainer = document.getElementById("gameContainer");

// Sounds
const clickSound = new Audio("sounds/click.mp3");
const winSound = new Audio("sounds/win.mp3");
const drawSound = new Audio("sounds/draw.wav");

// Function to select game mode
function selectMode(mode) {
  gameMode = mode;
  modeContainer.classList.add("hidden");
  playerContainer.classList.remove("hidden");

  if (gameMode === "hvc") {
    document.getElementById("player2").value = "Computer";
    document.getElementById("player2").disabled = true;
  } else {
    document.getElementById("player2").value = "";
    document.getElementById("player2").disabled = false;
  }
}

// Function to start the game
function startGame() {
  player1 = document.getElementById("player1").value || "Player X";
  player2 = document.getElementById("player2").value || "Player O";

  playerContainer.classList.add("hidden");
  gameContainer.classList.remove("hidden");

  resetGame();
}

// Function to handle cell click
function handleClick(e) {
  const index = e.target.dataset.index;
  if (board[index] !== "" || !isGameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer === "X" ? "player-x" : "player-o");
  clickSound.play();

  checkWinner();

  // If it's Human vs Computer and X just played, let computer play O
  if (isGameActive && gameMode === "hvc" && currentPlayer === "O") {
    setTimeout(computerMove, 500);
  }
}

// Computer's move logic
function computerMove() {
  const available = board.map((val, i) => val === "" ? i : null).filter(i => i !== null);
  const randomIndex = available[Math.floor(Math.random() * available.length)];
  if (randomIndex !== undefined) {
    board[randomIndex] = "O";
    const cell = document.querySelector(`.cell[data-index='${randomIndex}']`);
    cell.textContent = "O";
    cell.classList.add("player-o");
    clickSound.play();
    checkWinner();
  }
}

// Check for a winner or draw
function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  let winnerFound = false;
  for (const [a, b, c] of winPatterns) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winnerFound = true;
      isGameActive = false;
      winSound.play();
      const winnerName = board[a] === "X" ? player1 : player2;
      statusText.textContent = `🎉 ${winnerName} Wins!`;
      submitScore(player1, player2, winnerName);
      break;
    }
  }

  if (!winnerFound && !board.includes("")) {
    isGameActive = false;
    drawSound.play();
    statusText.textContent = "😅 It's a Draw!";
    submitScore(player1, player2, "Draw");
  }

  if (isGameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `${currentPlayer === "X" ? player1 : player2}'s Turn (${currentPlayer})`;
  }
}

// Reset game board
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  isGameActive = true;
  currentPlayer = "X";
  statusText.textContent = `${player1}'s Turn (X)`;

  boardCells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("player-x", "player-o");
  });
}

// Send score to backend (JSP)
function submitScore(p1, p2, winner) {
  fetch("submitScores.jsp", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `player1=${encodeURIComponent(p1)}&player2=${encodeURIComponent(p2)}&winner=${encodeURIComponent(winner)}`
  });
}

// Add event listeners to each cell
boardCells.forEach(cell => {
  cell.addEventListener("click", handleClick);
});
