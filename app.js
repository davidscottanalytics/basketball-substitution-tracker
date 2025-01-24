document.getElementById('player-form').addEventListener('submit', startGame);

let timerInterval;
let currentTime = 1200; // 20 minutes in seconds
let substitutionTime = 210; // 3:30 in seconds

function startGame(event) {
    event.preventDefault();

    // Collect player names from the form
    let players = {
        pointGuards: [document.getElementById('pointGuard1').value, document.getElementById('pointGuard2').value],
        centers: [document.getElementById('center1').value, document.getElementById('center2').value],
        powerForwards: [document.getElementById('powerForward1').value, document.getElementById('powerForward2').value],
        wings: [document.getElementById('wing1').value, document.getElementById('wing2').value, document.getElementById('wing3').value]
    };

    // Show game interface
    document.getElementById('player-form').classList.add('hidden');
    document.getElementById('game-info').classList.remove('hidden');

    // Start the game timer
    startTimer(players);
}

function startTimer(players) {
    // Countdown timer logic
    timerInterval = setInterval(() => {
        currentTime--;
        updateTimerDisplay();

        // Check if it's time for a substitution
        if (currentTime % substitutionTime === 0) {
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

function showSubstitutionPrompt() {
    document.getElementById('substitution-warning').classList.remove('hidden');
    document.getElementById('substitute-btn').classList.remove('hidden');

    document.getElementById('substitute-btn').addEventListener('click', () => {
        alert('Substitute Players!');
        // Here you would add logic to handle the actual substitutions
        document.getElementById('substitution-warning').classList.add('hidden');
        document.getElementById('substitute-btn').classList.add('hidden');
    });
}
