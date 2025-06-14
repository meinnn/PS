const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const gears = input.slice(0, 4).map((line) => line.split('').map(Number));
const K = +input[4];
const rotation = input.slice(5).map((line) => line.split(' ').map(Number));

const pivot = Array(4).fill(0); // 12시 방향 칸

for (const [num, dir] of rotation) {
  const idx = num - 1;

  // 왼쪽 톱니바퀴 회전
  rotateLeft(idx, dir);
  // 오른쪽 톱니바퀴 회전
  rotateRight(idx, dir);

  // 본인 회전
  pivot[idx] = (pivot[idx] - dir + 8) % 8;
}

// 점수 계산
let score = 0;
for (let i = 0; i < 4; i++) {
  if (gears[i][pivot[i]] === 1) {
    score += 2 ** i;
  }
}

console.log(score);

function rotateLeft(idx, dir) {
  if (idx < 1) return;

  const left = idx - 1;
  const pos1 = (pivot[idx] + 6) % 8;
  const pos2 = (pivot[left] + 2) % 8;
  if (gears[idx][pos1] !== gears[left][pos2]) {
    rotateLeft(left, dir * -1);
    pivot[left] = (pivot[left] + dir + 8) % 8;
  }
}

function rotateRight(idx, dir) {
  if (idx >= 3) return;

  const right = idx + 1;
  const pos1 = (pivot[idx] + 2) % 8;
  const pos2 = (pivot[right] + 6) % 8;
  if (gears[idx][pos1] !== gears[right][pos2]) {
    rotateRight(right, dir * -1);
    pivot[right] = (pivot[right] + dir + 8) % 8;
  }
}
