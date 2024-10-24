let userName = '';
let opponentName = '';
let selectedIcon = '';
let opponentSelectedIcon = '';
let gameStarted = false;
let timer;
let timeLeft = 30;
let playerScore = 0;
let opponentScore = 0;

// Lijst van willekeurige namen voor tegenstanders
const randomNames = ["Alex", "Charlie", "Jordan", "Morgan", "Taylor", "Casey", "Riley", "Cameron"];

// Start Game
document.getElementById('start-game').addEventListener('click', function () {
  userName = document.getElementById('username').value;
  if (!userName) {
    alert("Please enter your name to continue.");
    return;
  }

  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('game-screen').style.display = 'block';

  // Fake connecting to opponent
  connectToOpponent();
});

// Simuleer het verbinden met een nieuwe tegenstander
function connectToOpponent() {
  setTimeout(() => {
    opponentName = getRandomOpponentName();
    document.getElementById('opponent-name').innerText = opponentName;
    startTimer();
  }, 2000); // Simuleert de vertraging bij het vinden van een tegenstander
}

// Genereer een willekeurige tegenstander naam
function getRandomOpponentName() {
  return randomNames[Math.floor(Math.random() * randomNames.length)];
}

// Start de timer
function startTimer() {
  document.getElementById('timer').style.display = 'block';
  document.getElementById('time-left').innerText = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('time-left').innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      checkResult();
    }
  }, 1000);
}

// Verwerk icoon selectie
document.querySelectorAll('.icon').forEach(button => {
  button.addEventListener('click', function () {
    if (selectedIcon) return; // Voorkom herselectie
    selectedIcon = this.innerText;

    document.getElementById('waiting-message').style.display = 'block';
    blockUI(true);

    // Simuleer tegenstander selectie na korte vertraging
    setTimeout(() => {
      opponentSelectedIcon = simulateOpponentChoice();
      checkResult();
    }, 2000);
  });
});

// Simuleer de keuze van de tegenstander
function simulateOpponentChoice() {
  const icons = ['🔴', '🔷', '⭐', '❤️'];
  return icons[Math.floor(Math.random() * icons.length)];
}

// Controleer het resultaat nadat beide spelers hun keuze hebben gemaakt
function checkResult() {
  clearInterval(timer);
  document.getElementById('waiting-message').style.display = 'none';
  document.getElementById('timer').style.display = 'none';

  let resultMessage = '';

  if (selectedIcon === opponentSelectedIcon) {
    resultMessage = `It's a match! 🎉`;
    playerScore++; // Update de score van de speler
  } else {
    resultMessage = `No match. ${opponentName} wins this round!`;
    opponentScore++; // Update de score van de tegenstander
  }

  document.getElementById('result-message').innerText = resultMessage;
  document.getElementById('result-message').style.display = 'block';
  document.getElementById('reset-game').style.display = 'block';

  // Update de scores op het scherm
  updateScoreboard();
}

// Reset het spel voor een nieuwe ronde
document.getElementById('reset-game').addEventListener('click', function () {
  selectedIcon = '';
  opponentSelectedIcon = '';
  timeLeft = 30;

  document.getElementById('result-message').style.display = 'none';
  document.getElementById('reset-game').style.display = 'none';
  document.getElementById('waiting-message').style.display = 'none';
  blockUI(false);

  connectToOpponent(); // Start een nieuwe ronde met een nieuwe tegenstander
});

// Blokkeer de UI nadat een selectie is gemaakt
function blockUI(block) {
  document.querySelectorAll('.icon').forEach(button => {
    button.disabled = block;
  });
}

// Update het scoreboard
function updateScoreboard() {
  document.getElementById('player-score').innerText = playerScore;
  document.getElementById('opponent-score').innerText = opponentScore;
}
