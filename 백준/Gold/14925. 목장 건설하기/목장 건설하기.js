const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [M, N] = input[0].split(' ').map(Number);
const ground = input.slice(1).map((row) => row.split(' ').map(Number));

const dp = Array.from({ length: M + 1 }, () => Array(N + 1).fill(0));
let L = 0;

for (let i = 1; i <= M; i++) {
  for (let j = 1; j <= N; j++) {
    if (ground[i - 1][j - 1] === 0) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
      L = Math.max(L, dp[i][j]); // 최댓값 갱신
    }
  }
}

console.log(L);
