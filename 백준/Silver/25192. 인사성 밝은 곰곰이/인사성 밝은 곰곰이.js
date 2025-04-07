const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input[0]);
const map = {};

let enter = 0;
let cnt = 0;

for (let i = 1; i <= N; i++) {
  if (input[i] === 'ENTER') {
    enter++;
    continue;
  }

  const user = input[i];
  if (map[user] !== enter) {
    cnt++;
    map[user] = enter;
  }
}

console.log(cnt);
