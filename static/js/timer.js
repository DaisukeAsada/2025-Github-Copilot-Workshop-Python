let timer = 1500; // 25分（秒）
let initialTime = 1500; // 初期時間を保存
let timerInterval = null;
let isRunning = false;
let isWorkSession = true; // 作業セッション（true）か休憩セッション（false）か

// 円の半径
const CIRCLE_RADIUS = 80;
// 円の周囲の長さ（2πr）
const circleCircumference = 2 * Math.PI * CIRCLE_RADIUS;

function updateTimerDisplay() {
    const min = String(Math.floor(timer / 60)).padStart(2, '0');
    const sec = String(timer % 60).padStart(2, '0');
    document.getElementById('timer-text').textContent = `${min}:${sec}`;
    
    // 円グラフの進捗を更新
    updateProgressCircle();
}

function updateProgressCircle() {
    const progressCircle = document.getElementById('progress-circle');
    if (progressCircle) {
        const progress = timer / initialTime; // 残り時間の割合
        const offset = circleCircumference * (1 - progress);
        progressCircle.style.strokeDashoffset = offset;
    }
}

function updateWorkState() {
    const workStateElement = document.getElementById('work-state');
    if (workStateElement) {
        if (isWorkSession) {
            workStateElement.textContent = '作業中';
            workStateElement.style.color = '#7b83eb';
            workStateElement.style.background = 'rgba(123, 131, 235, 0.1)';
        } else {
            workStateElement.textContent = '休憩中';
            workStateElement.style.color = '#10b981';
            workStateElement.style.background = 'rgba(16, 185, 129, 0.1)';
        }
    }
}

async function showCompletionNotification() {
    // 音による通知（ブラウザの標準音）
    try {
        // シンプルなビープ音を作成
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        // Handle suspended state due to autoplay policy
        if (audioContext.state === "suspended") {
            await audioContext.resume();
        }
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800; // 800Hz の音
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        console.log('Audio notification failed:', e);
    }
    
    // アラート通知
    if (isWorkSession) {
        alert('ポモドーロ終了！\n5分間の休憩に入りましょう。');
    } else {
        alert('休憩終了！\n新しいポモドーロを開始しましょう。');
    }
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
            showCompletionNotification();
            
            // セッションを切り替える
            isWorkSession = !isWorkSession;
            if (isWorkSession) {
                timer = 1500; // 25分の作業セッション
                initialTime = 1500;
            } else {
                timer = 300; // 5分の休憩セッション
                initialTime = 300;
            }
            updateTimerDisplay();
            updateWorkState();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    
    // 作業セッションにリセット
    isWorkSession = true;
    timer = 1500;
    initialTime = 1500;
    
    updateTimerDisplay();
    updateWorkState();
}

document.getElementById('start-btn').addEventListener('click', startTimer);
document.getElementById('reset-btn').addEventListener('click', resetTimer);

// 初期化
updateTimerDisplay();
updateWorkState();
