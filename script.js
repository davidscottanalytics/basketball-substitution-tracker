let players = {
    center1: null,
    center2: null,
    pf1: null,
    pf2: null,
    wing1: null,
    wing2: null,
    wing3: null,
    pg1: null,
    pg2: null,
};

let substitutions = [];
let playingTime = {
    center1: 0,
    center2: 0,
    pf1: 0,
    pf2: 0,
    wing1: 0,
    wing2: 0,
    wing3: 0,
    pg1: 0,
    pg2: 0,
};

let currentPlayers = {
    center: null,
    powerForward: null,
    wings: [],
    pointGuard: null,
};

let substitutionInterval;
let countdownTime = 210; // 3 minutes 30 seconds in seconds

// Initialize the form and roster
document.getElementById('playerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    players.center1 = document.getElementById('center1').value;
    players.center2 = document.getElementById('center2').value;
    players.pf1 = document.getElementById('pf1').value;
    players.pf2 = document.getElementById('pf2').value;
    players.wing1 = document.getElementById('wing1').value;
    players.wing2 = document.getElementById('wing2').value;
    players.wing3 = document.getElementById('wing3').value;
    players.pg1 = document.getElementById('pg1').value;
    players.pg2 = document.getElementById('pg2').value;
    startGame();
});

function startGame() {
    // Set starting roster
    currentPlayers.center = players.center1;
    currentPlayers.powerForward = players.pf1;
    currentPlayers.wings = [players.wing1, players.wing2];
    currentPlayers.pointGuard = players.pg1;

    // Display the initial players
    updateCurrentPlayers();
    startCountdown();
}

function startCountdown() {
    substitutionInterval = setInterval(function() {
        countdownTime--;
        const minutes = Math.floor(countdownTime / 60);
        const seconds = countdownTime % 60;
        document.getElementById('countdown').textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

        if (countdownTime <= 0) {
            handleSubstitution();
            countdownTime = 210; // Reset to 3:30
        }
    }, 1000);
}

function handleSubstitution() {
    // Example substitution logic (you can add more detailed logic here)
    let subIn = [];
    let subOut = [];

    // Choose players based on positions (example)
    if (currentPlayers.center === players.center1) {
        subIn.push(players.center2);
        subOut.push(players.center1);
    } else {
        subIn.push(players.center1);
        subOut.push(players.center2);
    }

    // Update current players and playing time (simplified logic)
    currentPlayers.center = subIn[0];

    // Update UI with new players in/out
    updateCurrentPlayers();
}

function updateCurrentPlayers() {
    const current = document.getElementById('current-players');
    current.innerHTML = `
        Center: ${currentPlayers.center} <br>
        Power Forward: ${currentPlayers.powerForward} <br>
        Wings: ${currentPlayers.wings.join(', ')} <br>
        Point Guard: ${currentPlayers.pointGuard}
    `;
}

