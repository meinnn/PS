const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, Q] = input[0].split(' ').map(Number);
const lands = input.slice(1).map(Number);

const occupied = Array(N + 1).fill(false);
let result = [];

for (const land of lands) {
  const path = [];
  let node = land;

  while (node !== 0) {
    path.push(node);
    node = Math.floor(node / 2);
  }

  let ret = 0;
  for (const node of path.reverse()) {
    if (occupied[node]) {
      ret = node;
      break;
    }
  }

  if (ret === 0) occupied[land] = true;
  result.push(ret);
}

console.log(result.join('\n'));
