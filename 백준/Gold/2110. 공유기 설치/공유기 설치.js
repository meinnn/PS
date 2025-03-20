const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, C] = input[0].split(' ').map(Number);
const houses = input.slice(1).map(Number);

houses.sort((a, b) => a - b); // 오름차순 정렬

let start = 1;
let end = houses[N - 1] - houses[0];
let result = 0;

while (start <= end) {
  const mid = Math.floor((start + end) / 2);

  let cnt = 1; // 설치할 수 있는 공유기 수
  let last = houses[0]; // 마지막 설치한 공유기 위치
  for (let i = 1; i < N; i++) {
    if (houses[i] - last >= mid) {
      last = houses[i];
      cnt++;
    }
  }

  if (cnt >= C) {
    // 설치할 수 있는 것보다 많거나 같다 -> 거리 늘림
    result = mid;
    start = mid + 1;
  } else {
    // 설치할 수 있는 것보다 적다 -> 거리 줄임
    end = mid - 1;
  }
}

console.log(result);
