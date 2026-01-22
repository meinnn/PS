const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = +input[0];
const points = input.slice(1).map(Number);

let cnt = 0;

for (let i = N - 2; i >= 0; i--) {
  if (points[i + 1] <= points[i]) {
    cnt += points[i] - points[i + 1] + 1;
    points[i] = points[i + 1] - 1;
  }
}

console.log(cnt);
