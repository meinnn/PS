const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input[0]);
const K = Number(input[1]);

// B[K] 값 찾기
// B[x] <= x
let start = 1;
let end = K;

while (start <= end) {
  const mid = Math.floor((start + end) / 2);
  let cnt = 0;

  // 현재 탐색값(= mid)보다 작거나 같은 숫자의 개수 구하기
  for (let i = 1; i <= N; i++) {
    cnt += Math.min(Math.floor(mid / i), N);
  }

  // cnt가 적다 -> 더 많아야 함 -> 탐색값 더 크게
  if (cnt < K) {
    start = mid + 1;
  } else {
    end = mid - 1;
  }
}

console.log(start);
