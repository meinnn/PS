const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = +input[0];
const board = Array.from({ length: N }, () => Array(N * 2).fill(' '));

function draw(x, y, size) {
  if (size === 3) {
    board[x][y + 2] = '*';
    board[x + 1][y + 1] = '*';
    board[x + 1][y + 3] = '*';
    for (let i = 0; i < 5; i++) board[x + 2][y + i] = '*';
    return;
  }

  const newSize = size / 2;
  draw(x, y + newSize, newSize);
  draw(x + newSize, y, newSize);
  draw(x + newSize, y + size, newSize);
}

draw(0, 0, N);
console.log(board.map((line) => line.join('')).join('\n'));
