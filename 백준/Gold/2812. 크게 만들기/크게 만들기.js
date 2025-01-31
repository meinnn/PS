const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

let [N, K] = input[0].split(' ').map(Number);
const num = input[1].split('').map(Number);

const stack = [];
for (const n of num) {
  while (stack[stack.length - 1] < n && K-- > 0) {
    stack.pop();
  }

  stack.push(n);
}

while (K-- > 0) {
  stack.pop();
}

console.log(stack.join(''));
