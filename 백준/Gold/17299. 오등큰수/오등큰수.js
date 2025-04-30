const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input[0]);
const A = input[1].split(' ').map(Number);
const F = {}; // 등장 횟수

for (let i = 0; i < N; i++) {
  F[A[i]] = (F[A[i]] || 0) + 1;
}

const result = [];
const stack = [];

for (let i = N - 1; i >= 0; i--) {
  while (stack.length > 0 && F[stack[stack.length - 1]] <= F[A[i]]) {
    stack.pop();
  }

  if (stack.length === 0) {
    result.push(-1);
  } else {
    result.push(stack[stack.length - 1]);
  }

  stack.push(A[i]);
}

console.log(result.reverse().join(' '));
