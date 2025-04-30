const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input[0]);
const height = input.slice(1).map(Number);

const stack = [];
let result = 0;

for (let i = 0; i < N; i++) {
  let count = 1;

  // 현재 키보다 작거나 같은 사람 pop
  while (stack.length && stack[stack.length - 1][0] <= height[i]) {
    const [h, c] = stack.pop();
    result += c;
    if (h === height[i]) count += c; // 같은 사람은 count 누적
  }

  if (stack.length) result++; // 나보다 큰 앞 사람 하나

  stack.push([height[i], count]);
}

console.log(result);
