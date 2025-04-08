const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const n = Number(input[0]);
const stair = input.slice(1).map(Number);

const dp = Array(n + 1).fill(0);

dp[1] = stair[0];
dp[2] = stair[0] + stair[1];

for (let i = 3; i <= n; i++) {
  dp[i] = Math.max(dp[i - 2], dp[i - 3] + stair[i - 2]) + stair[i - 1];
}

console.log(dp[n]);
