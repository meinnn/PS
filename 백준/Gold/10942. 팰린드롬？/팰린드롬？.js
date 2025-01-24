const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

const N = Number(input[0]);
const arr = input[1].split(' ').map(Number);
const M = Number(input[2]);

const dp = Array.from({ length: N }, () => Array(N).fill(-1));

function isPalindrome(start, end) {
  if (start >= end) return 1;

  if (dp[start][end] !== -1) return dp[start][end];

  // 팰린드롬 여부 판단
  if (arr[start] === arr[end]) {
    dp[start][end] = isPalindrome(start + 1, end - 1);
  } else {
    dp[start][end] = 0;
  }

  return dp[start][end];
}

const results = [];
for (let i = 3; i < M + 3; i++) {
  const [S, E] = input[i].split(' ').map(Number);
  results.push(isPalindrome(S - 1, E - 1));
}

console.log(results.join('\n'));
