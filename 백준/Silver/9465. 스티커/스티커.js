const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

const T = +input[0];
for (let i = 0; i < T; i++) {
  const n = +input[1 + 3 * i];
  const stickers = Array(2);
  stickers[0] = input[2 + 3 * i].split(' ').map(Number);
  stickers[1] = input[3 + 3 * i].split(' ').map(Number);

  const dp = [...Array(2)].map(() => Array(n + 1).fill(0));
  dp[0][1] = stickers[0][0];
  dp[1][1] = stickers[1][0];

  for (let j = 2; j <= n; j++) {
    for (let i = 0; i < 2; i++) {
      dp[i][j] =
        Math.max(dp[1 - i][j - 1], dp[i][j - 2], dp[1 - i][j - 2]) +
        stickers[i][j - 1];
    }
  }

  console.log(Math.max(dp[0][n], dp[1][n]));
}
