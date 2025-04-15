const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);

const prefixSum = Array(N + 1).fill(0);
let result = -Infinity;

for (let i = 1; i <= N; i++) {
  prefixSum[i] = prefixSum[i - 1] + arr[i - 1];

  if (i >= K) {
    const sum = prefixSum[i] - prefixSum[i - K];
    result = Math.max(sum, result);
  }
}

console.log(result);
