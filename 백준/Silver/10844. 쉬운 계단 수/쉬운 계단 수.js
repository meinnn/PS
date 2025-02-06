const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const n = Number(fs.readFileSync(filePath).toString().trim());

// dp[자리수][마지막숫자(0~9)]
const dp = Array.from({ length: n + 1 }, () => Array(10).fill(0));
const MOD = 1000000000;

for (let i = 1; i <= 9; i++) dp[1][i] = 1;

for (let i = 2; i <= n; i++) {
  for (let j = 0; j <= 9; j++) {
    if (j > 0) dp[i][j] += dp[i - 1][j - 1] % MOD;
    if (j < 9) dp[i][j] += dp[i - 1][j + 1] % MOD;
  }
}

const result = dp[n].reduce((acc, val) => (acc + val) % MOD, 0);
console.log(result);
