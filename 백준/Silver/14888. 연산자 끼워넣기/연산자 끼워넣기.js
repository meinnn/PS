const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input[0]);
const A = input[1].split(' ').map(Number);
const [plus, minus, mul, div] = input[2].split(' ').map(Number);

let max = -Infinity;
let min = Infinity;

function calc(idx, cur, plus, minus, mul, div) {
  if (idx === N) {
    max = Math.max(cur, max);
    min = Math.min(cur, min);
    return;
  }

  if (plus > 0) {
    calc(idx + 1, cur + A[idx], plus - 1, minus, mul, div);
  }
  if (minus > 0) {
    calc(idx + 1, cur - A[idx], plus, minus - 1, mul, div);
  }
  if (mul > 0) {
    calc(idx + 1, cur * A[idx], plus, minus, mul - 1, div);
  }
  if (div > 0) {
    calc(idx + 1, Math.trunc(cur / A[idx]), plus, minus, mul, div - 1);
  }
}

calc(1, A[0], plus, minus, mul, div);

console.log(max === -0 ? 0 : max);
console.log(min === -0 ? 0 : min);
