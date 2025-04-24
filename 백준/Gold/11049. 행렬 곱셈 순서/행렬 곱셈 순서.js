const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input[0]);
const dims = [];

for (let i = 1; i <= N; i++) {
  const [r, c] = input[i].split(' ').map(Number);
  dims.push(r);
  if (i === N) dims.push(c);
}

const dp = Array.from({ length: N }, () => Array(N).fill(Infinity)); // dp[i][j] = i~j번 행렬 곱 연산 수

for (let i = 0; i < N; i++) dp[i][i] = 0;

for (let len = 2; len <= N; len++) { // 구간 길이
  for (let i = 0; i <= N - len; i++) { // 시작 인덱스
    let j = i + len - 1; // 끝 인덱스
    for (let k = i; k < j; k++) {
      dp[i][j] = Math.min(
        dp[i][j],
        dp[i][k] + dp[k + 1][j] + dims[i] * dims[k + 1] * dims[j + 1]
      );
    }
  }
}

console.log(dp[0][N - 1]);
