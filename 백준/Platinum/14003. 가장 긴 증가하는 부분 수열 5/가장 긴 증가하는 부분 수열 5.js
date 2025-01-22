const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');
const N = Number(input[0]);
const sequence = input[1].split(' ').map(Number);

const dp = [];
const positions = Array(N).fill(0); // 각 원소의 dp 인덱스 저장

// 이진탐색으로 LIS 구하기
for (let i = 0; i < N; i++) {
  let pos = lowerBound(dp, sequence[i]);

  if (pos < dp.length) dp[pos] = sequence[i];
  else dp.push(sequence[i]);

  positions[i] = pos;
}

// LIS 역추적
let last = dp.length - 1;
const lis = [];
for (let i = N - 1; i >= 0; i--) {
  if (positions[i] === last) {
    lis.push(sequence[i]);
    last--;
  }
}

console.log(dp.length);
console.log(lis.reverse().join(' '));

// arr에서 value가 들어갈 가장 작은 인덱스 반환
function lowerBound(arr, value) {
  let left = 0,
    right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] < value) left = mid + 1;
    else right = mid - 1;
  }

  return left;
}
