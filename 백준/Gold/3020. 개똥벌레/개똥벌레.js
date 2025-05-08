const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, H] = input[0].split(' ').map(Number);
const bottom = Array(H + 1).fill(0);
const top = Array(H + 1).fill(0);

for (let i = 1; i <= N; i++) {
  const size = +input[i];
  if (i % 2 !== 0) {
    bottom[size - 1]++;
  } else {
    top[size - 1]++;
  }
}

// 누적합
for (let i = H - 1; i >= 0; i--) {
  bottom[i] += bottom[i + 1];
  top[i] += top[i + 1];
}

let min = Infinity;
let count = 0;

for (let i = 0; i < H; i++) {
  const obstacle = bottom[i] + top[H - i - 1];

  if (obstacle < min) {
    min = obstacle;
    count = 1;
  } else if (obstacle === min) {
    count++;
  }
}

console.log(min, count);
