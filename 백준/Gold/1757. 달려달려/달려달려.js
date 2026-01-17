const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const run = input.slice(1).map(Number);

const dp = Array.from({ length: N + 1 }, () => Array(M + 1).fill(-Infinity)); // dp[time][tired]
dp[0][0] = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j <= M; j++) {
    if (dp[i][j] === -Infinity) {
      continue;
    }

    // 달림
    if (j < M) {
      dp[i + 1][j + 1] = Math.max(dp[i + 1][j + 1], dp[i][j] + run[i]);
    }
    // 쉼
    if (j === 0) {
      dp[i + 1][0] = Math.max(dp[i + 1][0], dp[i][j]);
    } else if (i + j <= N) {
      dp[i + j][0] = Math.max(dp[i + j][0], dp[i][j]);
    }
  }
}

console.log(dp[N][0]);
