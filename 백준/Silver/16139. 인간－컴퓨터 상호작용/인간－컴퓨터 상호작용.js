const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const S = input[0];
const q = Number(input[1]);

const count = Array.from({ length: S.length + 1 }, () => Array(26).fill(0));

for (let i = 1; i <= S.length; i++) {
  for (let j = 0; j < 26; j++) {
    const index = S.charCodeAt(i - 1) - 'a'.charCodeAt(0);
    count[i][j] = count[i - 1][j] + (j === index ? 1 : 0);
  }
}

const result = [];

for (let i = 2; i < 2 + q; i++) {
  const [a, l, r] = input[i].split(' ');
  const idx = a.charCodeAt(0) - 'a'.charCodeAt(0);

  result.push(count[+r + 1][idx] - count[+l][idx]);
}

console.log(result.join('\n'));
