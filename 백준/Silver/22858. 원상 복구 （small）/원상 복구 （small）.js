const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);
let S = input[1].split(' ').map(Number);
const D = input[2].split(' ').map(Number);
const P = Array(N);

for (let i = 0; i < K; i++) {
  for (let j = 0; j < N; j++) {
    P[D[j] - 1] = S[j];
  }
  S = [...P];
}

console.log(P.join(' '));
