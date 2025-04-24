const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [M, N, H] = input[0].split(' ').map(Number);
const box = Array.from({ length: H }, () =>
  Array.from({ length: N }, () => Array(M))
);

const q = [];
let unripe = 0;
let line = 1;

for (let i = 0; i < H; i++) {
  for (let j = 0; j < N; j++) {
    box[i][j] = input[line++].split(' ').map(Number);
    for (let k = 0; k < M; k++) {
      if (box[i][j][k] === 1) q.push([i, j, k]);
      else if (box[i][j][k] === 0) unripe++;
    }
  }
}

const dir = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
];

let day = 0;
let head = 0;

// bfs
while (head < q.length && unripe > 0) {
  let qsize = q.length - head;

  while (qsize--) {
    const [z, x, y] = q[head++];

    for (const [dz, dx, dy] of dir) {
      const [nz, nx, ny] = [z + dz, x + dx, y + dy];

      if (
        nz < 0 ||
        nz >= H ||
        nx < 0 ||
        nx >= N ||
        ny < 0 ||
        ny >= M ||
        box[nz][nx][ny] !== 0
      )
        continue;

      box[nz][nx][ny] = 1;
      unripe--;
      q.push([nz, nx, ny]);
    }
  }
  day++;
}

console.log(unripe > 0 ? -1 : day);
