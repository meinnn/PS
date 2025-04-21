const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const A = input.slice(1, 1 + N).map((row) => row.split(' ').map(Number));
const [_, K] = input[1 + N].split(' ').map(Number);
const B = input.slice(2 + N).map((row) => row.split(' ').map(Number));

const result = Array.from({ length: N }, () => Array(K).fill(0));

function multiply(a, b) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < K; j++) {
      for (let k = 0; k < M; k++) {
        result[i][j] += a[i][k] * b[k][j];
      }
    }
  }
}

multiply(A, B);
console.log(result.map((row) => row.join(' ')).join('\n'));
