let startTime, updatedTime, difference, tInterval;
let running = false;
const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');
const surpriseText = document.getElementById('surpriseText');
const gameBtn = document.getElementById('gameBtn');
const gameStatus = document.getElementById('gameStatus');
const popup = document.getElementById('popup');
const popupTitle = document.getElementById('popupTitle');
const popupMessage = document.getElementById('popupMessage');
const closePopup = document.getElementById('closePopup');
const aboutBtn = document.getElementById('aboutBtn');

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
gameBtn.addEventListener('click', startGame);
aboutBtn.addEventListener('click', showAbout);
closePopup.addEventListener('click', closePopupHandler);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 10);
        startStopBtn.innerHTML = "Stop";
        surpriseText.innerHTML = "Keep going! You're doing great!";
        running = true;
    } else {
        clearInterval(tInterval);
        startStopBtn.innerHTML = "Start";
        surpriseText.innerHTML = "You paused! Take a deep breath!";
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerHTML = "00:00:00.00";
    startStopBtn.innerHTML = "Start";
    lapsList.innerHTML = "";
    surpriseText.innerHTML = "Let's measure time with style!";
}

function lap() {
    if (running) {
        const lapTime = display.innerHTML;
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        lapsList.appendChild(lapItem);
        surpriseText.innerHTML = "Great! Keep it up!";
        showPopup("Lap Recorded", `You recorded a lap time of ${lapTime}.`);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    display.innerHTML = hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

// Quick Reaction Game
let gameTimeout, startTimeGame;

function startGame() {
    gameStatus.innerHTML = "Get ready to test your reaction time!";
    gameBtn.disabled = true;
    surpriseText.innerHTML = "Click 'Start Game' and wait for the command to click again!";
    
    gameTimeout = setTimeout(() => {
        gameStatus.innerHTML = "Click now!";
        startTimeGame = new Date().getTime();
        document.body.addEventListener('click', endGame);
    }, Math.random() * 3000 + 2000);
}

function endGame() {
    const endTimeGame = new Date().getTime();
    const reactionTime = endTimeGame - startTimeGame;

    if (startTimeGame) {
        gameStatus.innerHTML = `Your reaction time is ${reactionTime} ms!`;
        surpriseText.innerHTML = "Amazing! Try again to improve your reaction speed!";
        showPopup("Reaction Time Recorded", `Your reaction time was ${reactionTime} milliseconds.`);
        startTimeGame = null;
        document.body.removeEventListener('click', endGame);
        gameBtn.disabled = false;
    }
}

function showPopup(title, message) {
    popup.style.display = 'flex';
    popupTitle.textContent = title;
    popupMessage.innerHTML = message;
}

function closePopupHandler() {
    popup.style.display = 'none';
}

function showAbout() {
    const message = `
        This stopwatch allows you to measure time precisely and record lap times.<br><br>
        The quick reaction game tests your reflexes. Click 'Start Game' and react quickly when prompted to click again!
    `;
    showPopup("About", message);
}
