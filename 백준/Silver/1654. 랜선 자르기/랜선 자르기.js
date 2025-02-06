const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [K, N] = input[0].split(' ').map(Number);
const arr = input.slice(1, K + 1).map(Number);

let start = 1;
let end = Math.max(...arr);
let result = 0;

while (start <= end) {
  let mid = Math.floor((start + end) / 2);
  let cnt = 0;

  for (let lan of arr) {
    cnt += Math.floor(lan / mid);
  }

  if (cnt >= N) {
    // N개 이상 만들 수 있으면 길이 늘림
    result = mid; // 최대값 갱신
    start = mid + 1;
  } else {
    // N개를 만들 수 없으면 길이 줄임
    end = mid - 1;
  }
}

console.log(result);
