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

let substitutions = [];  // Stores substitution sequence
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

let bench = {
    center: [],
    powerForward: [],
    wings: [],
    pointGuard: [],
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

    // Assign all players to the bench initially
    bench.center = [players.center2];
    bench.powerForward = [players.pf2];
    bench.wings = [players.wing3];
    bench.pointGuard = [players.pg2];

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
    // Find the 2 players who have been on the court the longest
    let playersOnCourt = [
        { name: currentPlayers.center, position: 'center', time: playingTime[currentPlayers.center] },
        { name: currentPlayers.powerForward, position: 'powerForward', time: playingTime[currentPlayers.powerForward] },
        { name: currentPlayers.pointGuard, position: 'pointGuard', time: playingTime[currentPlayers.pointGuard] },
        ...currentPlayers.wings.map((wing, idx) => ({ name: wing, position: 'wing', time: playingTime[wing] }))
    ];

    // Sort players on court by playing time (ascending)
    playersOnCourt.sort((a, b) => a.time - b.time);

    // Choose the 2 longest playing players to sub out
    let playersOut = playersOnCourt.slice(0, 2);  // Sub out the 2 players with the longest time on court

    // Find the 2 players who have been on the bench the longest
    let playersOnBench = [
        ...bench.center.map(player => ({ name: player, position: 'center', time: playingTime[player] })),
        ...bench.powerForward.map(player => ({ name: player, position: 'powerForward', time: playingTime[player] })),
        ...bench.wings.map(player => ({ name: player, position: 'wing', time: playingTime[player] })),
        ...bench.pointGuard.map(player => ({ name: player, position: 'pointGuard', time: playingTime[player] }))
    ];

    // Sort bench players by time (ascending)
    playersOnBench.sort((a, b) => a.time - b.time);

    // Choose the 2 longest sitting players to sub in
    let playersIn = playersOnBench.slice(0, 2);

    // Perform the substitution
    playersOut.forEach(player => {
        if (player.position === 'center') currentPlayers.center = null;
        if (player.position === 'powerForward') currentPlayers.powerForward = null;
        if (player.position === 'pointGuard') currentPlayers.pointGuard = null;
        if (player.position === 'wing') currentPlayers.wings = currentPlayers.wings.filter(wing => wing !== player.name);
        playingTime[player.name] += countdownTime;  // Add time played before substitution
    });

    // Now add players in
    playersIn.forEach(player => {
        if (player.position === 'center') currentPlayers.center = player.name;
        if (player.position === 'powerForward') currentPlayers.powerForward = player.name;
        if (player.position === 'pointGuard') currentPlayers.pointGuard = player.name;
        if (player.position === 'wing') currentPlayers.wings.push(player.name);
        bench[player.posi
