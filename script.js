// script.js

let gameTimer;
let countdownTimer;
let currentTime = 200; // Start from 3:20 (200 seconds)
let substitutions = [];

const startBtn = document.getElementById("startBtn");
const countdownDisplay = document.getElementById("countdown");
const nextSubstitution = document.getElementById("next-substitution");
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

  countdownTimer = setInterval(() => {
    currentTime--;
    updateCountdownDisplay();
    if (currentTime <= 0) {
      handleSubstitution();
      resetCountdown();
    }
  }, 1000);
}

// Function to update the countdown timer display
function updateCountdownDisplay() {
  let minutes = Math.floor(currentTime / 60);
  let seconds = currentTime % 60;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  countdownDisplay.textContent = `${minutes}:${seconds}`;
}

// Function to handle the substitution logic
function handleSubstitution() {
  // Example substitution pattern:
  let subs = [];

  if (currentTime <= 0) {
    // Substitution logic here
    subs.push({ in: players.pg[1], out: players.pg[0] });
    players.pg.reverse();

    subs.push({ in: players.pf[1], out: players.pf[0] });
    players.pf.reverse();

    // Display the next substitution info
    nextSubstitution.textContent = `Next Substitution: PG and PF`;

    // Add substitution to the history list
    subs.forEach(sub => {
      const listItem = document.createElement("li");
      listItem.textContent = `${sub.in} is in, ${sub.out} is out.`;
      substitutionsList.appendChild(listItem);
    });
  }
}

// Reset the countdown timer to 3:20 after each substitution
function resetCountdown() {
  currentTime = 200;
}

// Start the timer when the button is clicked
startBtn.addEventListener("click", startTimer);
