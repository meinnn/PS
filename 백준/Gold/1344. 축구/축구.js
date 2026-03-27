const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [pA, pB] = input.map((e) => e / 100);

const TERM = 18;
const dpA = Array.from({ length: TERM + 1 }, () => Array(TERM + 1).fill(0)); // dp[기간][골]
const dpB = Array.from({ length: TERM + 1 }, () => Array(TERM + 1).fill(0));

dpA[0][0] = 1.0;
dpB[0][0] = 1.0;

for (let i = 1; i <= TERM; i++) {
  for (let j = 0; j <= TERM; j++) {
    // 골 넣음
    if (j > 0) {
      dpA[i][j] += dpA[i - 1][j - 1] * pA;
      dpB[i][j] += dpB[i - 1][j - 1] * pB;
    }

    // 못 넣음
    dpA[i][j] += dpA[i - 1][j] * (1 - pA);
    dpB[i][j] += dpB[i - 1][j] * (1 - pB);
  }
}

const primes = [2, 3, 5, 7, 11, 13, 17];
let probA = 0;
let probB = 0;

for (let score of primes) {
  probA += dpA[TERM][score];
  probB += dpB[TERM][score];
}

const result = 1 - (1 - probA) * (1 - probB);
console.log(result);
