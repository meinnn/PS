const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let T = Number(input[0]);
let line = 1;
const result = [];

while (T-- > 0) {
  const K = Number(input[line++]);
  const arr = input[line++].split(' ').map(Number);

  result.push(solve(K, arr));
}

console.log(result.join('\n'));

function solve(k, arr) {
  // DP 배열: dp[start][end] => start~end 구간의 최소 비용
  const dp = Array.from({ length: k }, () => Array(k).fill(Infinity));

  // 누적 합 배열 (prefix sum)
  const sum = Array(k).fill(0);
  sum[0] = arr[0];
  for (let i = 1; i < k; i++) sum[i] = sum[i - 1] + arr[i];

  // Knuth 최적화용 분할점 배열
  const opt = Array.from({ length: k }, () => Array(k).fill(0));

  // 초기 조건: 한 개의 파일은 합칠 필요 없음
  for (let i = 0; i < k; i++) {
    dp[i][i] = 0;
    opt[i][i] = i;
  }

  // DP 채우기 (길이 len=2부터 K까지)
  for (let len = 2; len <= k; len++) {
    for (let start = 0; start + len - 1 < k; start++) {
      let end = start + len - 1;

      // 최적화된 탐색 범위 (Knuth Optimization)
      let optimalStart = opt[start][end - 1];
      let optimalEnd = opt[start + 1][end];

      dp[start][end] = Infinity;
      for (
        let mid = optimalStart;
        mid <= Math.min(optimalEnd, end - 1);
        mid++
      ) {
        let cost =
          dp[start][mid] +
          dp[mid + 1][end] +
          (sum[end] - (start > 0 ? sum[start - 1] : 0));

        if (dp[start][end] > cost) {
          dp[start][end] = cost;
          opt[start][end] = mid;
        }
      }
    }
  }

  return dp[0][k - 1];
}
