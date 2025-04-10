const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const dp = Array(101);
dp[0] = 0;
dp[1] = 1;
dp[2] = 1;
for (let i = 3; i <= 100; i++) {
  dp[i] = dp[i - 3] + dp[i - 2];
}

const result = [];
const T = Number(input[0]);

for (let t = 1; t <= T; t++) {
  const N = Number(input[t]);
  result.push(dp[N]);
}

console.log(result.join('\n'));
