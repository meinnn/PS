const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M, A, B, K] = input[0].split(' ').map(Number);
const map = Array.from({ length: N + 1 }, () => Array(M + 1).fill(0));
let line = 1;

for (let i = 0; i < K; i++) {
  const [x, y] = input[line++].split(' ').map(Number);
  map[x][y] = 1;
}

const start = input[line++].split(' ').map(Number);
const end = input[line++].split(' ').map(Number);

const ps = Array.from({ length: N + 1 }, () => Array(M + 1).fill(0));
for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= M; j++) {
    ps[i][j] = ps[i - 1][j] + ps[i][j - 1] - ps[i - 1][j - 1] + map[i][j];
  }
}

const dist = Array.from({ length: N + 1 }, () => Array(M + 1).fill(-1));
const q = [[start[0], start[1]]];
dist[start[0]][start[1]] = 0;

let head = 0;

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

while (head < q.length) {
  const [cx, cy] = q[head++];

  if (cx === end[0] && cy === end[1]) break;

  for (let i = 0; i < 4; i++) {
    const nx = cx + dx[i];
    const ny = cy + dy[i];

    if (nx < 1 || ny < 1 || nx > N || ny > M) continue;
    if (dist[nx][ny] !== -1) continue;
    if (!canPlace(nx, ny)) continue;

    dist[nx][ny] = dist[cx][cy] + 1;
    q.push([nx, ny]);
  }
}

console.log(dist[end[0]][end[1]]);

function canPlace(x, y) {
  const x2 = x + A - 1;
  const y2 = y + B - 1;
  if (x < 1 || y < 1 || x2 > N || y2 > M) return false;
  return !rectHasObstacle(x, y, x2, y2);
}

function rectHasObstacle(x1, y1, x2, y2) {
  const sum = ps[x2][y2] - ps[x1 - 1][y2] - ps[x2][y1 - 1] + ps[x1 - 1][y1 - 1];
  return sum > 0;
}
