const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

const T = Number(input[0]);

const solve = (n, stickers) => {
  // DP 배열 초기화
  const dp = Array.from({ length: 2 }, () => Array(n + 1).fill(0));

  // 초기 값 설정
  dp[0][1] = stickers[0][0];
  dp[1][1] = stickers[1][0];

  // DP 계산
  for (let j = 2; j <= n; j++) {
    dp[0][j] = Math.max(dp[1][j - 1], dp[1][j - 2]) + stickers[0][j - 1];
    dp[1][j] = Math.max(dp[0][j - 1], dp[0][j - 2]) + stickers[1][j - 1];
  }

  // 최댓값 반환
  return Math.max(dp[0][n], dp[1][n]);
};

for (let t = 0; t < T; t++) {
  const n = Number(input[1 + 3 * t]); // 스티커 개수
  const stickers = [
    input[2 + 3 * t].split(' ').map(Number),
    input[3 + 3 * t].split(' ').map(Number),
  ];

  console.log(solve(n, stickers));
}
