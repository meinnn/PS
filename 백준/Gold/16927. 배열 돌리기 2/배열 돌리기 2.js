const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let [N, M, R] = input[0].split(' ').map(Number);
const arr = input.slice(1).map((row) => row.split(' ').map(Number));

const layers = Math.min(N, M) / 2;

for (let l = 0; l < layers; l++) {
  const top = l;
  const left = l;
  const bottom = N - 1 - l;
  const right = M - 1 - l;

  let ring = []; // 테두리 레이어를 1차원으로 추출

  for (let j = left; j <= right; j++) {
    ring.push(arr[top][j]);
  }
  for (let i = top + 1; i <= bottom - 1; i++) {
    ring.push(arr[i][right]);
  }
  for (let j = right; j >= left; j--) {
    ring.push(arr[bottom][j]);
  }
  for (let i = bottom - 1; i >= top + 1; i--) {
    ring.push(arr[i][left]);
  }

  const r = R % ring.length;

  if (r !== 0) {
    const rotated = ring.slice(r).concat(ring.slice(0, r)); // 반시계
    ring = rotated;
  }

  let idx = 0;
  for (let j = left; j <= right; j++) {
    arr[top][j] = ring[idx++];
  }
  for (let i = top + 1; i <= bottom - 1; i++) {
    arr[i][right] = ring[idx++];
  }
  for (let j = right; j >= left; j--) {
    arr[bottom][j] = ring[idx++];
  }
  for (let i = bottom - 1; i >= top + 1; i--) {
    arr[i][left] = ring[idx++];
  }
}

console.log(arr.map((row) => row.join(' ')).join('\n'));
