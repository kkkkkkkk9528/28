// 倒计时工具模块

let countdownTarget = null;

function getCountdown() {
  if (!countdownTarget) {
    const now = new Date();
    countdownTarget = new Date(now.getTime() + 4 * 60 * 60 * 1000);
  }
  
  const now = new Date();
  const diff = countdownTarget - now;
  
  if (diff <= 0) {
    countdownTarget = new Date(now.getTime() + 4 * 60 * 60 * 1000);
    return `${String(4).padStart(2, '0')}小时 ${String(0).padStart(2, '0')}分 ${String(0).padStart(2, '0')}秒`;
  }
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return `${String(hours).padStart(2, '0')}小时 ${String(minutes).padStart(2, '0')}分 ${String(seconds).padStart(2, '0')}秒`;
}

function updateCountdown() {
  const countdownEl = document.getElementById('countdown-display');
  if (countdownEl) {
    countdownEl.textContent = getCountdown();
  }
}

export function startCountdownTimer() {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}
