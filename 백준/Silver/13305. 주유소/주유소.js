const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input[0]);
const road = input[1].split(' ').map(BigInt);
const price = input[2].split(' ').map(BigInt);

let cost = 0n;
let minPrice = price[0];

for (let i = 0; i < N - 1; i++) {
  if (price[i] < minPrice) minPrice = price[i];
  cost += minPrice * road[i];
}

console.log(cost.toString());
