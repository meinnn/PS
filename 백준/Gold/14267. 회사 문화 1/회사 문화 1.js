const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const manager = input[1].split(' ').map(Number);

const compliment = Array(n + 1).fill(0);

for (let line = 2; line < 2 + m; line++) {
  const [i, w] = input[line].split(' ').map(Number);
  compliment[i] += w;
}

const dp = Array(n + 1).fill(-1);

function re_dp(idx) {
  if (idx === 1) {
    return (dp[idx] = 0);
  }

  if (dp[idx] !== -1) {
    return dp[idx];
  }

  return (dp[idx] = compliment[idx] + re_dp(manager[idx - 1]));
}

for (let i = 1; i <= n; i++) {
  re_dp(i);
}

console.log(dp.slice(1).join(' '));
