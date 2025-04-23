const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input[0]);
const A = input[1].split(' ').map(Number);
const M = Number(input[2]);
const targets = input[3].split(' ').map(Number);

const result = [];
A.sort((a, b) => a - b);

for (const target of targets) {
  let left = 0;
  let right = N - 1;
  let isExist = 0;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (A[mid] === target) {
      isExist = 1;
      break;
    } else if (A[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  result.push(isExist);
}

console.log(result.join('\n'));
