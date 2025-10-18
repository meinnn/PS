const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = +input[0];
const M = +input[1];
const x = input[2].split(' ').map(Number);

let left = 0;
let right = N + 1;

while (left < right) {
  const mid = Math.floor((left + right) / 2);
  let last = 0;

  for (const pos of x) {
    if (pos - mid > last) {
      break;
    }
    last = pos + mid;
  }

  if (last < N) {
    left = mid + 1;
  } else {
    right = mid;
  }
}

console.log(left);
