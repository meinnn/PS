const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const board = input.map((line) => line.split(' ').map(Number));
const blanks = [];

for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    if (board[i][j] === 0) blanks.push([i, j]);
  }
}

fillBlank(0);

function fillBlank(idx) {
  if (idx >= blanks.length) {
    console.log(board.map((row) => row.join(' ')).join('\n'));
    process.exit(0);
  }

  const [x, y] = blanks[idx];

  // 1~9까지 다 넣어보기
  for (let i = 1; i < 10; i++) {
    if (checkRow(x, i) && checkCol(y, i) && checkSquare(x, y, i)) {
      board[x][y] = i;
      fillBlank(idx + 1);
      board[x][y] = 0; // 원복
    }
  }
}

function checkRow(row, num) {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num) return false;
  }
  return true;
}

function checkCol(col, num) {
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === num) return false;
  }
  return true;
}

function checkSquare(x, y, num) {
  const startX = Math.floor(x / 3) * 3;
  const startY = Math.floor(y / 3) * 3;

  for (let i = startX; i < startX + 3; i++) {
    for (let j = startY; j < startY + 3; j++) {
      if (board[i][j] === num) return false;
    }
  }
  return true;
}
