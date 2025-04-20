const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input[0]);
const matrix = input.slice(1).map((row) => row.split(' ').map(Number));

let result = [0, 0, 0]; // -1, 0, 1로 채워진 종이의 개수

function divide(x, y, size) {
  if (size === 1) {
    result[matrix[x][y] + 1]++;
    return;
  }

  if (allSame(x, y, size)) {
    result[matrix[x][y] + 1]++;
    return;
  }

  const newSize = size / 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      divide(x + newSize * i, y + newSize * j, newSize);
    }
  }
}

function allSame(x, y, size) {
  const number = matrix[x][y];
  for (let i = x; i < x + size; i++) {
    for (let j = y; j < y + size; j++) {
      if (matrix[i][j] !== number) return false;
    }
  }
  return true;
}

divide(0, 0, N);
console.log(result.join('\n'));
