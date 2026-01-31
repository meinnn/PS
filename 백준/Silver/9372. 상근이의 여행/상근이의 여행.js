const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const T = +input[0];
let line = 1;
const result = [];

for (let t = 0; t < T; t++) {
  const [N, M] = input[line++].split(' ').map(Number);

  line += M;
  result.push(N - 1);
}

console.log(result.join('\n'));
