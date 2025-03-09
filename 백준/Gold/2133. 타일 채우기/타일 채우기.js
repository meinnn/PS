const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const N = +fs.readFileSync(filePath).toString().trim();

const dp = Array(N + 1).fill(0);

if (N % 2 === 0) {
  dp[2] = 3;
  for (let i = 4; i <= N; i += 2) {
    dp[i] = dp[i - 2] * dp[2] + 2;
    for (let j = 2; j <= i - 4; j += 2) {
      dp[i] += dp[j] * 2;
    }
  }
}

console.log(dp[N]);
