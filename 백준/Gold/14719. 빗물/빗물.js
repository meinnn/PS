const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

const [H, W] = input[0].split(' ').map(Number);
const blocks = input[1].split(' ').map(Number);

const board = [...Array(H)].map(() => Array(W).fill(0));

for (let i = 0; i < W; i++) {
  for (let j = 0; j < blocks[i]; j++) {
    board[j][i] = 1;
  }
}

let answer = 0;
for (let i = 0; i < H; i++) {
  let start = board[i].indexOf(1);
  let end = board[i].lastIndexOf(1);

  for (let j = start; j < end; j++) {
    if (board[i][j] === 0) answer++;
  }
}

console.log(answer);
