const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const A = input[1].split(' ').map(Number);

const modCount = Array(M).fill(0);
let sum = 0;
let result = 0;

for (let i = 0; i < N; i++) {
  sum += A[i];
  const mod = sum % M;
  modCount[mod]++;
  if (mod === 0) result++; // 누적합 자체가 M으로 나누어떨어지는 경우
}

// 조합 nC2 = n * (n-1) /2
for (let i = 0; i < M; i++) {
  result += (modCount[i] * (modCount[i] - 1)) / 2;
}

console.log(result);
