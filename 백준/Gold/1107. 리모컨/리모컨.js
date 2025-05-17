const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = +input[0];
const M = +input[1];
const broken = M > 0 ? input[2].split(' ').map(Number) : [];

const isBroken = Array(10).fill(false);
for (const b of broken) {
  isBroken[b] = true;
}

function canMake(num) {
  if (num === 0) return !isBroken[0];
  while (num > 0) {
    if (isBroken[num % 10]) return false;
    num = Math.floor(num / 10);
  }
  return true;
}

let answer = Math.abs(N - 100); // +, -로만 이동

for (let i = 0; i <= 1000000; i++) {
  if (canMake(i)) {
    const count = i.toString().length + Math.abs(i - N);
    answer = Math.min(answer, count);
  }
}

console.log(answer);
