const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M, H] = input[0].split(' ').map(Number);
const ladder = Array.from({ length: H + 1 }, () => Array(N + 1).fill(0));

for (let i = 1; i <= M; i++) {
  const [a, b] = input[i].split(' ').map(Number);
  ladder[a][b] = 1; // 오른쪽으로 연결
  ladder[a][b + 1] = 2; // 왼쪽으로 연결
}

let min = Infinity;

function isFinished(board) {
  for (let start = 1; start <= N; start++) {
    let j = start;
    for (let i = 1; i <= H; i++) {
      if (board[i][j] === 1) j++;
      else if (board[i][j] === 2) j--;
    }
    if (j !== start) return false;
  }
  return true;
}

function drawLine(cnt, row, col, board) {
  if (cnt >= min) return;
  if (isFinished(board)) {
    min = cnt;
    return;
  }
  if (cnt === 3) return;

  for (let i = row; i <= H; i++) {
    for (let j = i === row ? col : 1; j < N; j++) {
      if (board[i][j] === 0 && board[i][j + 1] === 0) {
        const copy = board.map((r) => [...r]);
        copy[i][j] = 1;
        copy[i][j + 1] = 2;
        drawLine(cnt + 1, i, j, copy);
      }
    }
  }
}

drawLine(0, 1, 1, ladder);
console.log(min > 3 ? -1 : min);
