const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const n = Number(input[0]);
let board = input.slice(1, n + 1).map((line) => line.split(' ').map(Number));

// 체스판을 흑/백으로 나눠서 분리
const blackPositions = [];
const whitePositions = [];

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (board[i][j] === 1) {
      if ((i + j) % 2 === 0) {
        blackPositions.push([i, j]); // 흑칸
      } else {
        whitePositions.push([i, j]); // 백칸
      }
    }
  }
}

let maxBlack = 0;
let maxWhite = 0;

let max = 0;
dfs(blackPositions, 0, 0, []);
maxBlack = max; // 흑 칸의 최대 비숍 수

max = 0;
dfs(whitePositions, 0, 0, []);
maxWhite = max; // 백 칸의 최대 비숍 수

console.log(maxBlack + maxWhite); // 흑/백 칸 최대 개수의 합

function dfs(positions, idx, count, placed) {
  if (idx >= positions.length) {
    max = Math.max(max, count);
    return;
  }

  const [x, y] = positions[idx];

  if (isPossible(x, y, placed)) {
    placed.push([x, y]); // 비숍 배치
    dfs(positions, idx + 1, count + 1, placed);
    placed.pop(); // 백트래킹
  }
  dfs(positions, idx + 1, count, placed);
}

function isPossible(x, y, placed) {
  for (const [px, py] of placed) {
    if (Math.abs(px - x) === Math.abs(py - y)) return false; // 같은 대각선에 존재하면 불가능
  }
  return true;
}
