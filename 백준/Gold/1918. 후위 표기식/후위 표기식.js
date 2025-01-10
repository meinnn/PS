const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim();

const precedence = {
  '*': 2,
  '/': 2,
  '+': 1,
  '-': 1,
  '(': 0,
};

let result = '';
const stack = [];
for (const char of input) {
  if (char >= 'A' && char <= 'Z') result += char;
  else {
    // 연산자 or 괄호
    if (char === '(') {
      stack.push(char);
    } else if (char === ')') {
      while (stack[stack.length - 1] !== '(') result += stack.pop();
      stack.pop();
    } else {
      // 나보다 우선순위 높거나 같은 거 먼저 계산
      while (precedence[char] <= precedence[stack[stack.length - 1]]) {
        result += stack.pop();
      }
      stack.push(char); // 먼저 계산할 거 없을 때 push
    }
  }
}

while (stack.length > 0) result += stack.pop();

console.log(result);
