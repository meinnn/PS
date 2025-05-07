const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const n = +input[0];
const arr = input[1].split(' ').map(Number);
const x = +input[2];

arr.sort((a, b) => a - b);

let left = 0;
let right = n - 1;
let count = 0;

while (left < right) {
  const sum = arr[left] + arr[right];
  if (sum <= x) {
    if (sum === x) count++;
    left++;
  } else {
    right--;
  }
}

console.log(count);
