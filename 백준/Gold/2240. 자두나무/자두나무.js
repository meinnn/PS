const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [T, W] = input[0].split(' ').map(Number);
const fall = input.slice(1).map(Number);

const dp = Array.from({ length: T + 1 }, () => Array(W + 1).fill(-1));

function re_dp(sec, move) {
  if (sec >= T) return 0;

  if (dp[sec][move] !== -1) return dp[sec][move];

  const pos = move % 2 === 0 ? 1 : 2;
  const get = fall[sec] === pos ? 1 : 0;

  let ret = re_dp(sec + 1, move) + get; // 안 움직여
  if (move < W) {
    // 움직여
    const nextPos = pos * -1 + 3;
    const nextGet = fall[sec] === nextPos ? 1 : 0;
    ret = Math.max(ret, re_dp(sec + 1, move + 1) + nextGet);
  }

  return (dp[sec][move] = ret);
}

console.log(re_dp(0, 0));
