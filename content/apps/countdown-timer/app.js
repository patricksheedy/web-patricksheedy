document.addEventListener('DOMContentLoaded', function() {
  const timerDisplay = document.getElementById('timer-display');
  const progressCircle = document.getElementById('progress-circle');
  const startBtn = document.getElementById('start-btn');
  const pauseBtn = document.getElementById('pause-btn');
  const resetBtn = document.getElementById('reset-btn');
  const hoursInput = document.getElementById('hours-input');
  const minutesInput = document.getElementById('minutes-input');
  const secondsInput = document.getElementById('seconds-input');
  const loopTimer = document.getElementById('loop-timer');
  const soundEnabled = document.getElementById('sound-enabled');
  const fullscreenBtn = document.getElementById('fullscreen-btn');
  const presetButtons = document.querySelectorAll('.preset-btn');

  let totalSeconds = 300;
  let remainingSeconds = 300;
  let intervalId = null;
  let isRunning = false;
  const circumference = 2 * Math.PI * 90;

  progressCircle.style.strokeDasharray = circumference;
  progressCircle.style.strokeDashoffset = 0;

  function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    
    if (h > 0) {
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  function updateDisplay() {
    timerDisplay.textContent = formatTime(remainingSeconds);
    const progress = remainingSeconds / totalSeconds;
    const offset = circumference * (1 - progress);
    progressCircle.style.strokeDashoffset = offset;
    
    if (remainingSeconds <= 10 && remainingSeconds > 0) {
      progressCircle.style.stroke = '#dc3545';
    } else if (remainingSeconds / totalSeconds <= 0.25) {
      progressCircle.style.stroke = '#ffc107';
    } else {
      progressCircle.style.stroke = '#0d6efd';
    }
  }

  function updateTotalFromInputs() {
    const h = parseInt(hoursInput.value) || 0;
    const m = parseInt(minutesInput.value) || 0;
    const s = parseInt(secondsInput.value) || 0;
    totalSeconds = h * 3600 + m * 60 + s;
    if (totalSeconds < 1) totalSeconds = 1;
    if (!isRunning) {
      remainingSeconds = totalSeconds;
      updateDisplay();
    }
  }

  function playSound() {
    if (!soundEnabled.checked) return;
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  }

  function onTimerComplete() {
    isRunning = false;
    startBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
    playSound();
    
    if (loopTimer.checked) {
      setTimeout(() => {
        remainingSeconds = totalSeconds;
        updateDisplay();
        startTimer();
      }, 1000);
    }
  }

  function tick() {
    remainingSeconds--;
    updateDisplay();
    
    if (remainingSeconds <= 0) {
      clearInterval(intervalId);
      onTimerComplete();
    }
  }

  function startTimer() {
    if (remainingSeconds <= 0) {
      remainingSeconds = totalSeconds;
    }
    isRunning = true;
    startBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-block';
    intervalId = setInterval(tick, 1000);
  }

  function pauseTimer() {
    isRunning = false;
    clearInterval(intervalId);
    startBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
  }

  function resetTimer() {
    isRunning = false;
    clearInterval(intervalId);
    remainingSeconds = totalSeconds;
    updateDisplay();
    startBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
  }

  startBtn.addEventListener('click', startTimer);
  pauseBtn.addEventListener('click', pauseTimer);
  resetBtn.addEventListener('click', resetTimer);

  hoursInput.addEventListener('input', updateTotalFromInputs);
  minutesInput.addEventListener('input', updateTotalFromInputs);
  secondsInput.addEventListener('input', updateTotalFromInputs);

  presetButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const seconds = parseInt(this.getAttribute('data-seconds'));
      totalSeconds = seconds;
      remainingSeconds = seconds;
      
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = seconds % 60;
      
      hoursInput.value = h;
      minutesInput.value = m;
      secondsInput.value = s;
      
      updateDisplay();
      if (isRunning) {
        pauseTimer();
      }
    });
  });

  fullscreenBtn.addEventListener('click', function() {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(err => {
        console.log('Fullscreen error:', err);
      });
    } else {
      document.exitFullscreen();
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
      e.preventDefault();
      if (isRunning) pauseTimer();
      else startTimer();
    } else if (e.code === 'KeyR') {
      e.preventDefault();
      resetTimer();
    } else if (e.code === 'KeyF') {
      e.preventDefault();
      fullscreenBtn.click();
    }
  });

  updateDisplay();
});
