const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const result = [];
const T = Number(input[0]);

for (let t = 1; t <= T; t++) {
  const [x, y] = input[t].split(' ').map(Number);

  let dist = y - x;
  let move = 0;
  let max = Math.floor(Math.sqrt(dist));

  if (dist === max * max) {
    move = 2 * max - 1;
  } else if (dist <= max * (max + 1)) {
    move = 2 * max;
  } else {
    move = 2 * max + 1;
  }

  result.push(move);
}

console.log(result.join('\n'));
