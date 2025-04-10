const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const dp = Array.from({ length: 51 }, () =>
  Array.from({ length: 51 }, () => Array(51).fill(-1))
);
const result = [];

for (let i = 0; i < input.length - 1; i++) {
  const [a, b, c] = input[i].split(' ').map(Number);
  result.push(`w(${a}, ${b}, ${c}) = ${w(a, b, c)}`);
}

console.log(result.join('\n'));

function w(a, b, c) {
  if (a <= 0 || b <= 0 || c <= 0) return 1;
  if (dp[a][b][c] !== -1) return dp[a][b][c];

  let ret;

  if (a > 20 || b > 20 || c > 20) {
    ret = w(20, 20, 20);
  } else if (a < b && b < c) {
    ret = w(a, b, c - 1) + w(a, b - 1, c - 1) - w(a, b - 1, c);
  } else {
    ret =
      w(a - 1, b, c) +
      w(a - 1, b - 1, c) +
      w(a - 1, b, c - 1) -
      w(a - 1, b - 1, c - 1);
  }

  return (dp[a][b][c] = ret);
}
