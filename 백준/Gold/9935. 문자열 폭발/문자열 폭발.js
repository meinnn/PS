const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const str = input[0];
const ex = input[1];
const stack = [];

for (let i = 0; i < str.length; i++) {
  stack.push(str[i]);

  if (str[i] === ex[ex.length - 1]) {
    const tmp = [];
    let idx = ex.length - 1;

    while (idx >= 0) {
      if (stack[stack.length - 1] !== ex[idx]) break;
      tmp.push(stack.pop());
      idx--;
    }

    if (idx >= 0) stack.push(...tmp.reverse());
  }
}

console.log(stack.length === 0 ? 'FRULA' : stack.join(''));
