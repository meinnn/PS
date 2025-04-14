const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input[0]);
const wires = input.slice(1).map((line) => line.split(' ').map(Number));

wires.sort((a, b) => a[0] - b[0]);

const dp = Array(N).fill(1);

for (let i = 0; i < N; i++) {
  for (let j = 0; j < i; j++) {
    if (wires[i][1] > wires[j][1]) {
      dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }
}

console.log(N - Math.max(...dp));
