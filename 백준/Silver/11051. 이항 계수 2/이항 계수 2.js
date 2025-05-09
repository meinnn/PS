const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);
const dp = Array.from({ length: N + 1 }, () => Array(K + 1).fill(0));

for (let i = 0; i <= N; i++) {
  for (let j = 0; j <= Math.min(i, K); j++) {
    if ((j === 0) | (j === i)) dp[i][j] = 1;
    else dp[i][j] = (dp[i - 1][j - 1] + dp[i - 1][j]) % 10007;
  }
}

console.log(dp[N][K]);
