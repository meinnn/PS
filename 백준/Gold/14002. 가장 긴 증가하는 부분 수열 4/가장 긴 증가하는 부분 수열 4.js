const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = +input[0];
const A = input[1].split(' ').map(Number);

const dp = Array(N).fill(1);
const prev = Array(N).fill(null);
let max = 1;
let last = 0;

for (let i = 0; i < N; i++) {
  for (let j = i + 1; j < N; j++) {
    if (A[j] > A[i] && dp[j] < dp[i] + 1) {
      dp[j] = dp[i] + 1;
      prev[j] = i;

      if (dp[j] > max) {
        max = dp[j];
        last = j;
      }
    }
  }
}

const lis = [];
for (let cur = last; cur !== null; cur = prev[cur]) {
  lis.push(A[cur]);
}

console.log(max);
console.log(lis.reverse().join(' '));
