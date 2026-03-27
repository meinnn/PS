const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const M = +input[0];
const stones = input[1].split(' ').map(Number);
const K = +input[2];

const total = stones.reduce((acc, cur) => acc + cur);
let result = 0;

for (let i = 0; i < M; i++) {
  if (stones[i] < K) continue;

  let prob = 1.0;
  for (let j = 0; j < K; j++) {
    prob *= (stones[i] - j) / (total - j);
  }

  result += prob;
}

console.log(result);
