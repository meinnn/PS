const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M, K, t] = input[0].split(' ').map(Number);
const molds = [];
let line = 1;

for (let i = 0; i < M; i++) {
  const [x, y] = input[line++].split(' ').map(Number);
  molds.push([x, y]);
}

const inspect = [];
for (let i = 0; i < K; i++) {
  const [x, y] = input[line++].split(' ').map(Number);
  inspect.push([x, y]);
}

if (N <= 2) {
  console.log('NO');
  process.exit(0);
}

const dx = [-1, -2, -2, -1, 1, 2, 2, 1];
const dy = [-2, -1, 1, 2, 2, 1, -1, -2];

let q = [...molds];
const visited = Array.from({ length: N + 1 }, () => Array.from({ length: N + 1 }, () => [false, false]));

for (let day = 0; day < t; day++) {
  if (q.length === 0) break;

  const tmp = [];
  const parity = (day + 1) & 1;

  while (q.length) {
    const [cx, cy] = q.pop();
    let canSpread = false;

    for (let i = 0; i < 8; i++) {
      const nx = cx + dx[i];
      const ny = cy + dy[i];

      if (nx < 1 || nx > N || ny < 1 || ny > N) continue;
      canSpread = true;

      if (visited[nx][ny][parity]) continue;
      visited[nx][ny][parity] = true;
      tmp.push([nx, ny]);
    }

    if (canSpread) {
      visited[cx][cy][day & 1] = true;
    }
  }

  q = tmp;
}

let shouldClean = false;
const p = t & 1;

for (const [x, y] of inspect) {
  if (visited[x][y][p]) {
    shouldClean = true;
    break;
  }
}

console.log(shouldClean ? 'YES' : 'NO');
