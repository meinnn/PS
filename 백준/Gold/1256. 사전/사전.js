const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
let [N, M, K] = fs.readFileSync(filePath).toString().trim().split(/\s+/).map(Number);

const LIMIT = 1000000000;

const max = N + M;
const C = Array.from({ length: max + 1 }, () => Array(max + 1).fill(0));

// 조합 채우기
for (let n = 0; n <= max; n++) {
  C[n][0] = 1;
  C[n][n] = 1;
  for (let r = 1; r < n; r++) {
    C[n][r] = Math.min(C[n - 1][r - 1] + C[n - 1][r], LIMIT);
  }
}

if (C[N + M][N] < K) {
  console.log(-1);
  process.exit(0);
}

const result = [];

while (N > 0 || M > 0) {
  if (N === 0) {
    result.push('z'.repeat(M));
    break;
  }
  if (M === 0) {
    result.push('a'.repeat(N));
    break;
  }

  const countA = C[N + M - 1][N - 1]; // 'a'로 시작하는 경우의 수

  if (K <= countA) {
    result.push('a');
    N--;
  } else {
    result.push('z');
    K -= countA;
    M--;
  }
}

console.log(result.join(''));
