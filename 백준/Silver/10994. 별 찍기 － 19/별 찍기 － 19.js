const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = +input[0];

const len = 1 + 4 * (N - 1);
const result = Array.from(Array(len), () => Array(len).fill('*'));

function star(row) {
  if (row >= len) {
    return;
  }

  // 위아래
  for (let j = row; j < len - row; j++) {
    result[row][j] = ' ';
    result[len - row - 1][j] = ' ';
  }

  // 왼오
  for (let i = row + 1; i < len - row - 1; i++) {
    result[i][row] = ' ';
    result[i][len - row - 1] = ' ';
  }

  star(row + 2);
}

star(1);
console.log(result.map((line) => line.join('')).join('\n'));
