const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [pA, pB] = input.map((e) => e / 100);

const TERM = 18;
const comb = Array.from({ length: TERM + 1 }, () => Array(TERM + 1).fill(0));

for (let i = 1; i <= TERM; i++) {
  for (let j = 0; j <= i; j++) {
    if (j === 0 || j === i) {
      comb[i][j] = comb[i][i] = 1;
    } else {
      comb[i][j] = comb[i][i - j] = comb[i - 1][j - 1] + comb[i - 1][j];
    }
  }
}

const primes = [2, 3, 5, 7, 11, 13, 17];
let probA = 0;
let probB = 0;

for (const time of primes) {
  probA += comb[TERM][time] * Math.pow(pA, time) * Math.pow(1 - pA, TERM - time);
  probB += comb[TERM][time] * Math.pow(pB, time) * Math.pow(1 - pB, TERM - time);
}

const result = 1 - (1 - probA) * (1 - probB);
console.log(result);
