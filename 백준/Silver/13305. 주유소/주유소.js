const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input[0]);
const road = input[1].split(' ').map(Number);
const price = input[2].split(' ').map(Number);

let cost = 0;
let minPrice = Infinity;

for (let i = 0; i < N - 1; i++) {
  minPrice = Math.min(minPrice, price[i]);
  cost += minPrice * road[i];
}

console.log(cost);
