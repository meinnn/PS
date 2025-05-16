const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = +input[0];
const dp = Array(N + 1).fill(Infinity);
const prev = Array(N + 1).fill(null);
dp[1] = 0;

for (let i = 2; i <= N; i++) {
  for (const next of [
    i - 1,
    i % 2 === 0 ? i / 2 : null,
    i % 3 === 0 ? i / 3 : null,
  ]) {
    if (next && dp[next] + 1 < dp[i]) {
      dp[i] = dp[next] + 1;
      prev[i] = next;
    }
  }
}

const path = [];
for (let cur = N; cur !== null; cur = prev[cur]) {
  path.push(cur);
}

console.log(dp[N]);
console.log(path.join(' '));
