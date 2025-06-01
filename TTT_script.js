const cells = document.querySelectorAll(".cell");
let currentPlayer = "X";
const winnerDisplay = document.getElementById("winner");
let confettiInterval = null;

function handleClick(event) {
  const cell = event.target;
  if (cell.textContent !== "") return;

  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());

  if (checkWin(currentPlayer)) {
    showWinner(currentPlayer);
    startConfetti();
  } else if (isDraw()) {
    showWinner("It's a draw!");
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function checkWin(player) {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return winPatterns.some(pattern =>
    pattern.every(index => cells[index].textContent === player)
  );
}

function isDraw() {
  return [...cells].every(cell => cell.textContent !== "");
}

function showWinner(message) {
  winnerDisplay.textContent = message === "It's a draw!" ? message : `${message} Wins! 🎉`;
  cells.forEach(cell => cell.removeEventListener("click", handleClick));
}

function resetGame() {
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("x", "o");
    cell.addEventListener("click", handleClick);
  });
  currentPlayer = "X";
  winnerDisplay.textContent = "";

  // Stop confetti
  clearInterval(confettiInterval);
  confettiInterval = null;
  document.querySelectorAll('.confetti').forEach(el => el.remove());
}

function startConfetti() {
  if (confettiInterval) return;

  confettiInterval = setInterval(() => {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * window.innerWidth + "px";
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.style.animationDuration = (Math.random() * 2 + 2) + "s";
    confetti.style.width = `${Math.random() * 6 + 4}px`;
    confetti.style.height = `${Math.random() * 6 + 4}px`;
    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 4000);
  }, 100);
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
