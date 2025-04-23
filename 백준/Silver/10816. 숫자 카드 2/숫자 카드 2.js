const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input[0]);
const cards = input[1].split(' ').map(Number);
const M = Number(input[2]);
const targets = input[3].split(' ').map(Number);

const result = [];
cards.sort((a, b) => a - b);

for (const target of targets) {
  const count = upperBound(target) - lowerBound(target);
  result.push(count);
}
console.log(result.join(' '));

function lowerBound(target) {
  let left = 0;
  let right = N;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    if (cards[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}

function upperBound(target) {
  let left = 0;
  let right = N;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    if (cards[mid] <= target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}
