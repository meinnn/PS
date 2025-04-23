const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input[0]);
const A = new Set(input[1].split(' ').map(Number));
const M = Number(input[2]);
const targets = input[3].split(' ').map(Number);

const result = [];

for (const target of targets) {
  result.push(A.has(target) ? 1 : 0);
}

console.log(result.join('\n'));
