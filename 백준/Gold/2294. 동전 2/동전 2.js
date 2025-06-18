const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [n, k] = input[0].split(' ').map(Number);
const coins = Array.from(new Set(input.slice(1).map(Number))); // 가치가 같은 동전 있음

const dp = Array(k + 1).fill(Infinity);
dp[0] = 0;
for (const coin of coins) dp[coin] = 1;

for (let i = 1; i <= k; i++) {
  for (const coin of coins) {
    if (i - coin < 0) continue;
    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
  }
}

console.log(dp[k] === Infinity ? -1 : dp[k]);
