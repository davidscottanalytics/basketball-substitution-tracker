// script.js

let gameTimer;
let currentTime = 0;
let substitutions = [];

const startBtn = document.getElementById("startBtn");
const timeDisplay = document.getElementById("time");
const substitutionsList = document.getElementById("substitutions-list");

let players = {
  pg: [],
  centers: [],
  pf: [],
  wings: []
};

// Function to start the timer
function startTimer() {
  const inputFields = document.querySelectorAll('.input-section input');
  inputFields.forEach(input => {
    if (input.value.trim() !== "") {
      const position = input.id.substring(0, 2); // "pg", "c", "pf", "w"
      players[position].push(input.value.trim());
    }
  });

  if (players.pg.length !== 2 || players.centers.length !== 2 || players.pf.length !== 2 || players.wings.length !== 3) {
    alert("Please enter all player names.");
    return;
  }

  startBtn.disabled = true;

  gameTimer = setInterval(() => {
    currentTime += 3;
    updateTimeDisplay();
    handleSubstitution();

    if (currentTime >= 40) {
      clearInterval(gameTimer);
      alert("Game over!");
    }
  }, 180000); // 3 minutes in milliseconds
}

// Function to update the timer display
function updateTimeDisplay() {
  let minutes = Math.floor(currentTime / 60);
  let seconds = currentTime % 60;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  timeDisplay.textContent = `${minutes}:${seconds}`;
}

// Function to handle the substitution logic
function handleSubstitution() {
  const subs = [];
  // Substitutions logic here based on your substitution pattern

  // Example substitution pattern:
  if (currentTime % 6 === 0) {
    subs.push({ in: players.pg[1], out: players.pg[0] });
    players.pg.reverse();
  }
  if (currentTime % 6 === 3) {
    subs.push({ in: players.centers[1], out: players.centers[0] });
    players.centers.reverse();
  }
  if (currentTime % 6 === 0) {
    subs.push({ in: players.pf[1], out: players.pf[0] });
    players.pf.reverse();
  }
  if (currentTime % 6 === 3) {
    subs.push({ in: players.wings[2], out: players.wings[0] });
    players.wings.push(players.wings.shift());
  }

  // Display substitutions
  subs.forEach(sub => {
    const listItem = document.createElement("li");
    listItem.textContent = `${sub.in} is in, ${sub.out} is out.`;
    substitutionsList.appendChild(listItem);
  });
}

startBtn.addEventListener("click", startTimer);
