const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const n = Number(input[0]);
const A = [],
  B = [],
  C = [],
  D = [];

for (let i = 1; i <= n; i++) {
  const [a, b, c, d] = input[i].split(' ').map(Number);
  A.push(a);
  B.push(b);
  C.push(c);
  D.push(d);
}

const AB_map = new Map(); // (A+B 합 : 개수)

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    const sumAB = A[i] + B[j];
    AB_map.set(sumAB, (AB_map.get(sumAB) || 0) + 1);
  }
}

let count = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    const sumCD = C[i] + D[j];
    const target = -sumCD;
    if (AB_map.has(target)) {
      count += AB_map.get(target); // AB에서 찾은 개수만큼 count 증가
    }
  }
}

console.log(count);
