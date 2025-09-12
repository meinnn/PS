const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let [N, M, R] = input[0].split(' ').map(Number);
const arr = input.slice(1).map((row) => row.split(' ').map(Number));

const dx = [1, 0, -1, 0]; // 아래, 오, 위, 왼
const dy = [0, 1, 0, -1];

const result = Array.from(Array(N), () => Array(M).fill(0));
let cnt = 0;

while (N > 0 && M > 0) {
  const size = 2 * (N + M - 2);
  const rotate = R % size;
  let [cx, cy, cd] = [cnt, cnt, 0];
  let [nx, ny, nd] = getRotatedPos(cx, cy, cd, rotate);

  for (let i = 0; i < size; i++) {
    result[nx][ny] = arr[cx][cy];

    [cx, cy, cd] = getNextPos(cx, cy, cd);
    [nx, ny, nd] = getNextPos(nx, ny, nd);
  }

  N -= 2;
  M -= 2;
  cnt++;
}

console.log(result.map((row) => row.join(' ')).join('\n'));

function getRotatedPos(cx, cy, dir, rotate) {
  let [nx, ny, nd] = [cx, cy, dir];

  for (let r = 0; r < rotate; r++) {
    [nx, ny, nd] = getNextPos(nx, ny, nd);
  }

  return [nx, ny, nd];
}

function getNextPos(cx, cy, cd) {
  let [nx, ny, nd] = [cx + dx[cd], cy + dy[cd], cd];

  if (nx < cnt || nx >= N + cnt || ny < cnt || ny >= M + cnt) {
    nd = (cd + 1) % 4;
    nx = cx + dx[nd];
    ny = cy + dy[nd];
  }
  return [nx, ny, nd];
}
