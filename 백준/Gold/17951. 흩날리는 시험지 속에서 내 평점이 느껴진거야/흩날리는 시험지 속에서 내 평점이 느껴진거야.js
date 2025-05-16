const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);
const scores = input[1].split(' ').map(Number);

let left = Math.min(...scores);
let right = scores.reduce((acc, cur) => acc + cur, 0);
let answer = 0;

while (left <= right) {
  const mid = Math.floor((left + right) / 2);
  let groupCount = 0;
  let sum = 0;

  for (let i = 0; i < N; i++) {
    sum += scores[i];
    if (sum >= mid) {
      groupCount++;
      sum = 0;
    }
  }

  if (groupCount >= K) {
    answer = mid;
    left = mid + 1;
  } else {
    right = mid - 1;
  }
}

console.log(answer);
