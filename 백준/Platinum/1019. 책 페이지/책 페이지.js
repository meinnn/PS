const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const N = Number(fs.readFileSync(filePath).toString().trim());

let count = Array(10).fill(0); // 0~9 등장 횟수 저장 배열
let digit = 1; // 현재 자리수 (1, 10, 100, ...)
let currentN = N; // 원본 N을 변경하면서 계산

while (currentN > 0) {
  let lower = N % digit; // 현재 자리수 아래 값
  let curDigit = Math.floor((N / digit) % 10); // 현재 자리 값
  let higher = Math.floor(N / (digit * 10)); // 현재 자리수 위 값

  // 현재 자리수를 기준으로 0~9가 등장하는 횟수 누적
  for (let i = 0; i < 10; i++) {
    if (i < curDigit) {
      count[i] += (higher + 1) * digit;
    } else if (i === curDigit) {
      count[i] += higher * digit + lower + 1;
    } else {
      count[i] += higher * digit;
    }
  }

  // 0은 맨 앞자리에서 등장하지 않음
  count[0] -= digit;

  // 자리수를 10배씩 증가시켜 다음 자리 계산
  digit *= 10;
  currentN = Math.floor(currentN / 10);
}

console.log(count.join(' '));
