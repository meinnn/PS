const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input[0]);
const hist = input.slice(1).map(Number);
const stack = [];
let result = 0;

hist.push(0);

for (let i = 0; i <= N; i++) {
  while (stack.length > 0 && hist[i] <= hist[stack[stack.length - 1]]) {
    const height = hist[stack.pop()];
    const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
    result = Math.max(result, height * width);
  }
  stack.push(i);
}

console.log(result);
