const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const n = Number(input[0]);
const divisors = input[1].split(' ').map(Number);

const max = Math.max(...divisors);
const min = Math.min(...divisors);

console.log(max * min);
