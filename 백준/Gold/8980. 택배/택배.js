const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

const [N, C] = input[0].split(' ').map(Number);
const M = Number(input[1]);
const boxes = input.slice(2, 2 + M).map((line) => line.split(' ').map(Number));

boxes.sort((a, b) => a[1] - b[1]); // 보내는 마을 기준 오름차순

const town = Array(N + 1).fill(0); // 각 마을당 실은 택배 수 저장
let answer = 0;

for (const box of boxes) {
  const [from, to, cnt] = box;

  let amount = cnt; // 이번에 실을 택배 수
  for (let i = from; i < to; i++) {
    amount = Math.min(amount, C - town[i]);
    if (amount === 0) break;
  }

  if (amount === 0) continue;

  for (let i = from; i < to; i++) {
    town[i] += amount;
  }
  answer += amount;
}

console.log(answer);
