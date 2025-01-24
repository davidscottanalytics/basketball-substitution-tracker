document.getElementById('player-form').addEventListener('submit', startGame);

let timerInterval;
let currentTime = 1200; // 20 minutes in seconds
let substitutionTime = 210; // 3:30 in seconds
let substitutionTimer = substitutionTime; // Countdown to next substitution
let currentPlayers = {}; // To store the current players on the court

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

    // Move to the next substitution
    upcomingSubstitutionIndex++;

    // Reset the substitution countdown
    substitutionTimer = substitutionTime;
    document.getElementById('substitute-btn').classList.add('hidden');
}

function initializeSubstitutionSchedule() {
    substitutions = [
        { time: '03:30', in: 'Point Guard 2', out: 'Point Guard 1' },
        { time: '07:00', in: 'Center 2', out: 'Center 1' },
        { time: '10:30', in: 'Power Forward 2', out: 'Power Forward 1' },
        { time: '14:00', in: 'Wing 3', out: 'Wing 1' },
        { time: '17:30', in: 'Point Guard 1', out: 'Point Guard 2' },
        { time: '20:00', in: 'Wing 1', out: 'Wing 2' },
        { time: '24:30', in: 'Center 1', out: 'Center 2' },
        { time: '28:00', in: 'Power Forward 1', out: 'Power Forward 2' },
        { time: '31:30', in: 'Wing 2', out: 'Wing 3' },
    ];
}

function updateSubstitutionSchedule() {
    let tableBody = document.getElementById('substitution-schedule').querySelector('tbody');
    tableBody.innerHTML = ''; // Clear existing rows
    substitutions.slice(0, upcomingSubstitutionIndex + 1).forEach((sub) => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${sub.time}</td>
            <td>${sub.in}</td>
            <td>${sub.out}</td>
        `;
        tableBody.appendChild(row);
    });
}
