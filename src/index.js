const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
// Add the missing query selectors:
const score = document.querySelector('#score'); // Use querySelector() to get the score element
const timerDisplay = document.querySelector('#timer'); // Use querySelector() to get the timer element.

let time = 0;
let timer;
let lastHole = 0;
let points = 0;
let difficulty = "hard";

/**
 * Generates a random integer within a range.
 */
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Sets the time delay given a difficulty parameter.
 */
function setDelay(difficulty) {
  if (difficulty === "easy") {
    return 1500;
  } else if (difficulty === "normal") {
    return 1000;
  } else if (difficulty === "hard") {
    return randomInteger(600, 1200);
  }
}

/**
 * Chooses a random hole from a list of holes.
 */
function chooseHole(holes) {
  let index = randomInteger(0, holes.length - 1);
  const hole = holes[index];
  if (hole === lastHole) {
    return chooseHole(holes);
  }
  lastHole = hole;
  return hole;
}

/**
 * Calls the showUp function if time > 0 and stops the game if time = 0.
 */
function gameOver() {
  if (time > 0) {
    return showUp();
  } else {
    return stopGame();
  }
}

/**
 * Calls the showAndHide() function with a specific delay and a hole.
 */
function showUp() {
  const delay = setDelay(difficulty);
  const hole = chooseHole(holes);
  return showAndHide(hole, delay);
}

/**
 * This function increments the points global variable and updates the scoreboard.
 */
function updateScore() {
  points++;
  score.textContent = points;
  return points;
}

/**
 * This function clears the score by setting points = 0.
 */
function clearScore() {
  points = 0;
  score.textContent = points;
  return points;
}

/**
 * This function updates the timer display.
 */
function updateTimer() {
  if (time > 0) {
    time--;
    timerDisplay.textContent = `Time: ${time}`;
  }
  return time;
}

/**
 * Starts the timer using setInterval.
 */
function startTimer() {
  timer = setInterval(updateTimer, 1000);
  return timer;
}

/**
 * This function is called when a player clicks on a mole.
 */
function whack(event) {
  updateScore();
  return points;
}

/**
 * Adds the 'click' event listeners to the moles.
 */
function setEventListeners(){
  moles.forEach(mole => {
    mole.addEventListener('click', whack);
  });
  return moles;
}

/**
 * This function is called when the game is stopped.
 */
function stopGame(){
  clearInterval(timer);
  return "game stopped";
}

/**
 * This is the function that starts the game when the startButton is clicked.
 */
function startGame(){
  clearScore();
  time = 10; // Initial time (seconds)
  timerDisplay.textContent = `Time: ${time}`;
  startTimer();
  return "game started";
}

startButton.addEventListener("click", startGame);



// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;
