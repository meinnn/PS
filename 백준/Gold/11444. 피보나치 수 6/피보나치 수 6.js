const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let n = BigInt(input[0]);
const MOD = 1000000007n;

function multiply(a, b) {
  return [
    [
      (a[0][0] * b[0][0] + a[0][1] * b[1][0]) % MOD,
      (a[0][0] * b[0][1] + a[0][1] * b[1][1]) % MOD,
    ],
    [
      (a[1][0] * b[0][0] + a[1][1] * b[1][0]) % MOD,
      (a[1][0] * b[0][1] + a[1][1] * b[1][1]) % MOD,
    ],
  ];
}

function matrixPow(mat, exp) {
  let result = [
    [1n, 0n],
    [0n, 1n],
  ]; // 단위 행렬

  while (exp > 0n) {
    if (exp % 2n === 1n) {
      result = multiply(result, mat);
    }
    mat = multiply(mat, mat);
    exp /= 2n;
  }

  return result;
}

function fib(n) {
  if (n === 0n) return 0;
  const base = [
    [1n, 1n],
    [1n, 0n],
  ];
  const result = matrixPow(base, n - 1n);
  return result[0][0]; // F(n)
}

console.log(fib(n).toString());
