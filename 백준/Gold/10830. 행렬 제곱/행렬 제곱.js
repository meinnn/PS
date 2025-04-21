const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let [N, B] = input[0].split(' ').map(Number);
let A = input.slice(1).map((row) => row.split(' ').map(Number));

let result = Array.from({ length: N }, () => Array(N).fill(0));
for (let i = 0; i < N; i++) result[i][i] = 1;

while (B > 0) {
  if (B % 2 !== 0) {
    result = multiply(result, A);
  }
  A = multiply(A, A);
  B = Math.floor(B / 2);
}

console.log(result.map((row) => row.join(' ')).join('\n'));

function multiply(a, b) {
  const ret = Array.from({ length: N }, () => Array(N).fill(0));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      for (let k = 0; k < N; k++) {
        ret[i][j] += a[i][k] * b[k][j];
        ret[i][j] %= 1000;
      }
    }
  }

  return ret;
}
