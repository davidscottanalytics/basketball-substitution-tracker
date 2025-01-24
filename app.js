document.getElementById('player-form').addEventListener('submit', startGame);

let timerInterval;
let currentTime = 1200; // 20 minutes in seconds
let substitutionTime = 210; // 3:30 in seconds
let substitutionTimer = substitutionTime; // Countdown to next substitution
let currentPlayers = {}; // To store the current players on the court
let playerTimes = {}; // To track each player's playing time

let substitutions = []; // Array to track all substitutions
let upcomingSubstitutionIndex = 0;

function startGame(event) {
    event.preventDefault();

    // Collect player names from the form
    currentPlayers = {
        pointGuard: document.getElementById('pointGuard1').value,
        center: document.getElementById('center1').value,
        powerForward: document.getElementById('powerForward1').value,
        wings: [
            document.getElementById('wing1').value,
            document.getElementById('wing2').value
        ]
    };

    // Initialize player times
    playerTimes = {
        [currentPlayers.pointGuard]: 0,
        [currentPlayers.center]: 0,
        [currentPlayers.powerForward]: 0,
        ...currentPlayers.wings.reduce((acc, wing) => {
            acc[wing] = 0;
            return acc;
        }, {})
    };

    // Show game interface
    document.getElementById('player-form').classList.add('hidden');
    document.getElementById('game-info').classList.remove('hidden');

    // Initialize substitution schedule
    initializeSubstitutionSchedule();

    // Start the game timer
    startTimer();
}

function startTimer() {
    // Countdown timer logic
    timerInterval = setInterval(() => {
        currentTime--;
        substitutionTimer--;
        updateTimerDisplay();
        updateCountdownDisplay();

        // Check if it's time for a substitution
        if (substitutionTimer <= 0) {
            showSubstitutionPrompt();
        }

        // End game after 40 minutes (2 halves of 20 minutes)
        if (currentTime <= 0) {
            clearInterval(timerInterval);
            alert('Game Over');
        }
    }, 1000);
}

function updateTimerDisplay() {
    let minutes = Math.floor(currentTime / 60);
    let seconds = currentTime % 60;
    document.getElementById('timer').innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateCountdownDisplay() {
    let minutes = Math.floor(substitutionTimer / 60);
    let seconds = substitutionTimer % 60;
    document.getElementById('countdown').innerText = `Substitution in: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function showSubstitutionPrompt() {
    // Determine which players to substitute
    let nextSub = substitutions[upcomingSubstitutionIndex];
    document.getElementById('next-sub-in').innerText = nextSub.in;
    document.getElementById('next-sub-out').innerText = nextSub.out;

    document.getElementById('substitute-btn').classList.remove('hidden');
    document.getElementById('substitute-btn').addEventListener('click', substitutePlayers);
}

function substitutePlayers() {
    // Handle the substitution
    let nextSub = substitutions[upcomingSubstitutionIndex];
    // Replace players on the court
    currentPlayers[nextSub.out] = nextSub.in;

    // Update the display for players on the court
    document.getElementById('current-pg').innerText = currentPlayers.pointGuard;
    document.getElementById('current-center').innerText = currentPlayers.center;
    document.getElementById('current-pf').innerText = currentPlayers.powerForward;
    document.getElementById('current-wings').innerText = currentPlayers.wings.join(', ');

    // Add this substitution to the table
    updateSubstitutionSchedule();

    // Update player playing times
    updatePlayerTimes(nextSub.in);

    // Move to the next substitution
    upcomingSubstitutionIndex++;

    // Reset the substitution countdown
    substitutionTimer = substitutionTime;
    document.getElementById('substitute-btn').classList.add('hidden');
}

function updatePlayerTimes(player) {
    playerTimes[player] += 3.5; // Increment by 3.5 minutes for each substitution
    updatePlayerTimeTable();
}

function updateSubstitutionSchedule() {
    let tableBody = document.getElementById('substitution-schedule').querySelector('tbody');
    tableBody.innerHTML = ''; // Clear existing rows
    substitutions.slice(0, upcomingSubstitutionIndex + 1).forEach((sub) => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${sub.time}</td>
