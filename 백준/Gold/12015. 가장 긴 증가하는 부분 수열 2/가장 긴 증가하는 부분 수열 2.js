const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input[0]);
const A = input[1].split(' ').map(Number);

const memo = [];

for (let a of A) {
  if (memo.length === 0 || memo[memo.length - 1] < a) {
    memo.push(a);
  } else {
    const pos = lowerBound(a);
    memo[pos] = a;
  }
}

console.log(memo.length);

function lowerBound(target) {
  let left = 0;
  let right = memo.length - 1;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    if (memo[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}
