const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input[0]);
const arr = input[1].split(' ').map(Number);

const dpi = Array(N).fill(1);
const dpd = Array(N).fill(1);

// 증가하는 부분 수열
for (let i = 0; i < N; i++) {
  for (let j = 0; j < i; j++) {
    if (arr[j] < arr[i]) {
      dpi[i] = Math.max(dpi[j] + 1, dpi[i]);
    }
  }
}

// 감소하는 부분 수열
for (let i = N - 1; i >= 0; i--) {
  for (let j = N - 1; j > i; j--) {
    if (arr[j] < arr[i]) {
      dpd[i] = Math.max(dpd[j] + 1, dpd[i]);
    }
  }
}

let result = 0;
for (let i = 0; i < N; i++) {
  result = Math.max(result, dpi[i] + dpd[i] - 1);
}

console.log(result);
