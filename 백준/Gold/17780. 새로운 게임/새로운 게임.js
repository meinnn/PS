const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);
const color = Array.from({ length: N + 2 }, () => Array(N + 2).fill(2));

for (let i = 1; i <= N; i++) {
  const row = input[i].split(' ').map(Number);
  for (let j = 1; j <= N; j++) {
    color[i][j] = row[j - 1];
  }
}

const board = Array.from({ length: N + 2 }, () => Array.from({ length: N + 2 }, () => []));
const pieces = [];
let line = N + 1;

for (let i = 0; i < K; i++) {
  const [r, c, d] = input[line++].split(' ').map(Number);
  board[r][c].push(i);
  pieces.push([r, c, d]);
}

const dx = [null, 0, 0, -1, 1];
const dy = [null, 1, -1, 0, 0];

let turn = 1;

outer: while (turn <= 1000) {
  for (let i = 0; i < K; i++) {
    const [x, y, d] = pieces[i];

    // 가장 아래 있는 말만 이동
    if (board[x][y][0] !== i) {
      continue;
    }

    if (!move(x, y, d, i)) {
      break outer;
    }
  }
  turn++;
}

console.log(turn > 1000 ? -1 : turn);

function move(x, y, d, idx) {
  let nx = x + dx[d];
  let ny = y + dy[d];

  // 흰색 칸
  if (color[nx][ny] === 0) {
    const cnt = board[x][y].length + board[nx][ny].length;
    if (cnt >= 4) return false;

    board[nx][ny].push(...board[x][y]);
    board[x][y] = [];
    for (let p of board[nx][ny]) {
      pieces[p][0] = nx;
      pieces[p][1] = ny;
    }
  }

  // 빨간색
  else if (color[nx][ny] === 1) {
    const cnt = board[x][y].length + board[nx][ny].length;
    if (cnt >= 4) return false;

    board[nx][ny].push(...board[x][y].reverse());
    board[x][y] = [];
    for (let p of board[nx][ny]) {
      pieces[p][0] = nx;
      pieces[p][1] = ny;
    }
  }

  // 파란색
  else {
    const nd = getReversedDir(d);
    pieces[idx][2] = nd;

    nx = x + dx[nd];
    ny = y + dy[nd];

    if (color[nx][ny] !== 2) {
      return move(x, y, nd, idx);
    }
  }

  return true;
}

function getReversedDir(d) {
  if (d === 1) return 2;
  if (d === 2) return 1;
  if (d === 3) return 4;
  if (d === 4) return 3;
}
