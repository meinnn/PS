const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = +input[0];
const liquid = input[1].split(' ').map(Number);

liquid.sort((a, b) => a - b);

let result = [];
let minDiff = Infinity;

for (let i = 0; i < N - 2; i++) {
  let left = i + 1;
  let right = N - 1;

  while (left < right) {
    const sum = liquid[i] + liquid[left] + liquid[right];

    if (Math.abs(sum) < minDiff) {
      minDiff = Math.abs(sum);
      result = [liquid[i], liquid[left], liquid[right]];
    }

    if (sum < 0) left++;
    else if (sum === 0) break;
    else right--;
  }
}

console.log(result.join(' '));
