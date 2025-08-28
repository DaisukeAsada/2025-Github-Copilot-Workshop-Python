let timer = 1500; // 25分（秒）
let timerInterval = null;
let isRunning = false;

function updateTimerDisplay() {
    const min = String(Math.floor(timer / 60)).padStart(2, '0');
    const sec = String(timer % 60).padStart(2, '0');
    document.getElementById('timer-text').textContent = `${min}:${sec}`;
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    timerInterval = setInterval(() => {
        if (timer > 0) {
            timer--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            isRunning = false;
            alert('ポモドーロ終了！');
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    timer = 1500;
    isRunning = false;
    updateTimerDisplay();
}

document.getElementById('start-btn').addEventListener('click', startTimer);
document.getElementById('reset-btn').addEventListener('click', resetTimer);

updateTimerDisplay();
