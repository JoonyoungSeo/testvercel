const drawBtn = document.getElementById('drawBtn');
const resetBtn = document.getElementById('resetBtn');
const ballsEl = document.getElementById('balls');
const historyList = document.getElementById('historyList');

let round = 0;
let isAnimating = false;

function getBallColor(num) {
  if (num <= 10) return 'yellow';
  if (num <= 20) return 'blue';
  if (num <= 30) return 'red';
  if (num <= 40) return 'gray';
  return 'green';
}

function pickNumbers() {
  const pool = Array.from({ length: 45 }, (_, i) => i + 1);
  const picked = [];
  while (picked.length < 6) {
    const idx = Math.floor(Math.random() * pool.length);
    picked.push(pool.splice(idx, 1)[0]);
  }
  return picked.sort((a, b) => a - b);
}

function showBalls(numbers) {
  ballsEl.innerHTML = '';
  numbers.forEach((num, i) => {
    const ball = document.createElement('div');
    ball.className = `ball ${getBallColor(num)}`;
    ball.textContent = num;
    ballsEl.appendChild(ball);

    // 순서대로 팝 애니메이션
    setTimeout(() => {
      ball.classList.add('pop');
    }, i * 150);
  });
}

function addHistory(numbers) {
  round++;
  const li = document.createElement('li');
  li.className = 'history-item';

  const roundSpan = document.createElement('span');
  roundSpan.className = 'round';
  roundSpan.textContent = `#${round}`;
  li.appendChild(roundSpan);

  numbers.forEach(num => {
    const mini = document.createElement('div');
    mini.className = `mini-ball ${getBallColor(num)}`;
    mini.textContent = num;
    li.appendChild(mini);
  });

  historyList.prepend(li);
}

drawBtn.addEventListener('click', () => {
  if (isAnimating) return;
  isAnimating = true;
  drawBtn.disabled = true;

  const numbers = pickNumbers();
  showBalls(numbers);

  // 애니메이션이 끝난 뒤 버튼 활성화
  const delay = 6 * 150 + 400;
  setTimeout(() => {
    addHistory(numbers);
    drawBtn.disabled = false;
    resetBtn.disabled = false;
    isAnimating = false;
  }, delay);
});

resetBtn.addEventListener('click', () => {
  ballsEl.innerHTML = '';
  for (let i = 0; i < 6; i++) {
    const ball = document.createElement('div');
    ball.className = 'ball placeholder';
    ball.textContent = '?';
    ballsEl.appendChild(ball);
  }
  historyList.innerHTML = '';
  round = 0;
  resetBtn.disabled = true;
});
