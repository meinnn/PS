const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input[0]);
const T = [];
const P = [];
for (let i = 1; i <= N; i++) {
  const [t, p] = input[i].split(' ').map(Number);
  T.push(t);
  P.push(p);
}

const dp = new Array(N + 1).fill(0);

for (let i = 0; i < N; i++) {
  dp[i + 1] = Math.max(dp[i + 1], dp[i]); // 상담 안 함
  if (i + T[i] <= N) {
    dp[i + T[i]] = Math.max(dp[i + T[i]], dp[i] + P[i]); // 상담함
  }
}

console.log(dp[N]);
