const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim();

let idx = 0;
let answer = 0;
let plus = true;

while (idx < input.length) {
  let tmp = '';
  while (idx < input.length && input[idx] !== '+' && input[idx] !== '-') {
    tmp += input[idx];
    idx++;
  }

  const num = Number(tmp);
  if (plus) answer += num;
  else answer -= num;

  if (input[idx] === '-') plus = false;
  idx++;
}

console.log(answer);
