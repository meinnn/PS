const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);
const coins = input.slice(1).map(Number);

let target = K;
let result = 0;

while (target !== 0) {
  while (coins[coins.length - 1] > target) coins.pop();

  const coin = coins.pop();
  result += Math.floor(target / coin);
  target %= coin;
}

console.log(result);
