const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [M, N] = input[0].split(' ').map(Number);
const K = +input[1];
const map = input.slice(2, 2 + M).map((line) => line.split(''));

const jungle = Array.from({ length: M + 1 }, () => Array(N + 1).fill(0));
const ocean = Array.from({ length: M + 1 }, () => Array(N + 1).fill(0));
const ice = Array.from({ length: M + 1 }, () => Array(N + 1).fill(0));

for (let i = 1; i <= M; i++) {
  for (let j = 1; j <= N; j++) {
    jungle[i][j] =
      jungle[i - 1][j] +
      jungle[i][j - 1] -
      jungle[i - 1][j - 1] +
      (map[i - 1][j - 1] === 'J' ? 1 : 0);
    ocean[i][j] =
      ocean[i - 1][j] +
      ocean[i][j - 1] -
      ocean[i - 1][j - 1] +
      (map[i - 1][j - 1] === 'O' ? 1 : 0);
    ice[i][j] =
      ice[i - 1][j] +
      ice[i][j - 1] -
      ice[i - 1][j - 1] +
      (map[i - 1][j - 1] === 'I' ? 1 : 0);
  }
}

const result = [];
for (let line = 2 + M; line < 2 + M + K; line++) {
  const [a, b, c, d] = input[line].split(' ').map(Number);
  const j =
    jungle[c][d] - jungle[c][b - 1] - jungle[a - 1][d] + jungle[a - 1][b - 1];
  const o =
    ocean[c][d] - ocean[c][b - 1] - ocean[a - 1][d] + ocean[a - 1][b - 1];
  const i = ice[c][d] - ice[c][b - 1] - ice[a - 1][d] + ice[a - 1][b - 1];
  result.push(`${j} ${o} ${i}`);
}

console.log(result.join('\n'));
