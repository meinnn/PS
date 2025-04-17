const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M, K] = input[0].split(' ').map(Number);
const board = input.slice(1).map((row) => row.split(''));

// 첫 칸이 검정인 경우 다시 칠해야 하는 칸 누적
const black = Array.from({ length: N + 1 }, () => Array(M + 1).fill(0));
// 첫 칸이 흰색인 경우 다시 칠해야 하는 칸 누적
const white = Array.from({ length: N + 1 }, () => Array(M + 1).fill(0));

for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= M; j++) {
    const cur = board[i - 1][j - 1];
    const expectBlack = (i + j) % 2 === 0 ? 'B' : 'W'; // black에서 맞는 값
    const expectWhite = (i + j) % 2 === 0 ? 'W' : 'B'; // white에서 맞는 값

    black[i][j] =
      black[i - 1][j] +
      black[i][j - 1] -
      black[i - 1][j - 1] +
      (cur !== expectBlack);
    white[i][j] =
      white[i - 1][j] +
      white[i][j - 1] -
      white[i - 1][j - 1] +
      (cur !== expectWhite);
  }
}

let result = Infinity;

for (let i = K; i <= N; i++) {
  for (let j = K; j <= M; j++) {
    const sumB =
      black[i][j] - black[i][j - K] - black[i - K][j] + black[i - K][j - K];
    const sumW =
      white[i][j] - white[i][j - K] - white[i - K][j] + white[i - K][j - K];
    result = Math.min(result, sumB, sumW);
  }
}

console.log(result);
