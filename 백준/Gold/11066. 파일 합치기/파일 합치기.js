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
  // dp[start][end] == start~end idx 파일 합치는 데 필요한 최소비용
  const dp = Array.from({ length: k }, () => Array(k).fill(-1));

  // 누적 합 배열
  const sum = Array(k).fill(0);
  sum[0] = arr[0];
  for (let i = 1; i < k; i++) sum[i] = sum[i - 1] + arr[i];

  function re_dp(start, end) {
    if (start === end) return 0; // 파일 합칠 필요 없음

    if (dp[start][end] !== -1) return dp[start][end];

    let ret = Infinity;
    for (let i = start; i < end; i++) {
      let left = re_dp(start, i); // 왼쪽 파일 최소
      let right = re_dp(i + 1, end); // 오른쪽 파일 최소
      let merge = sum[end] - (start > 0 ? sum[start - 1] : 0); // 왼+오 합치는데 드는 비용

      ret = Math.min(ret, left + right + merge);
    }

    return (dp[start][end] = ret);
  }

  return re_dp(0, k - 1);
}
