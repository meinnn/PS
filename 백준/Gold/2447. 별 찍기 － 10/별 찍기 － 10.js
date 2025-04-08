const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input[0]);
const result = Array.from({ length: N }, () => Array(N).fill('*'));

function blank(x, y, n) {
  if (n === 1) return;

  const size = n / 3;
  for (let i = 0; i < n; i += size) {
    for (let j = 0; j < n; j += size) {
      if (i === size && j === size) {
        for (let k = size; k < 2 * size; k++) {
          for (let l = size; l < 2 * size; l++) {
            result[x + k][y + l] = ' ';
          }
        }
      } else {
        blank(x + i, y + j, size);
      }
    }
  }
}

blank(0, 0, N);
console.log(result.map((line) => line.join('')).join('\n'));
