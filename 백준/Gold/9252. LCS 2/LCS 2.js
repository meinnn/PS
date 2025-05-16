const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const A = input[0];
const B = input[1];
const dp = Array.from({ length: A.length + 1 }, () =>
  Array(B.length + 1).fill(0)
);

for (let i = 1; i <= A.length; i++) {
  for (let j = 1; j <= B.length; j++) {
    if (A[i - 1] === B[j - 1]) {
      dp[i][j] = dp[i - 1][j - 1] + 1;
    } else {
      dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
}

let i = A.length;
let j = B.length;
const lcs = [];

console.log(dp[i][j]);

while (dp[i][j] !== 0) {
  if (dp[i - 1][j] === dp[i][j]) {
    i--;
  } else if (dp[i][j - 1] === dp[i][j]) {
    j--;
  } else {
    lcs.push(A[i - 1]);
    i--;
    j--;
  }
}

console.log(lcs.reverse().join(''));
