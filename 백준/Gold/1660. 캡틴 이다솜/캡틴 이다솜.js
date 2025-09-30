const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = +input[0];

const cnts = []; // 밑면 길이 N인 사분체의 대포 개수
let n = 1;

while (true) {
  const cnt = (n * (n + 1) * (n + 2)) / 6;
  if (cnt > N) break;

  cnts.push(cnt);
  n++;
}

const dp = Array(N + 1).fill(Infinity);
dp[0] = 0;

for (let i = 1; i <= N; i++) {
  for (let cnt of cnts) {
    if (i < cnt) break;
    dp[i] = Math.min(dp[i], dp[i - cnt] + 1);
  }
}

console.log(dp[N]);
