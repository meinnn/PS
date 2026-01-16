const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let line = 0;
const tc = +input[line++];

const results = [];

for (let t = 0; t < tc; t++) {
  const n = +input[line++];
  const clothes = {};

  for (let i = 0; i < n; i++) {
    const [name, category] = input[line++].split(' ');
    if (clothes[category]) {
      clothes[category].push(name);
    } else {
      clothes[category] = [name];
    }
  }

  let cnt = 1;
  for (const values of Object.values(clothes)) {
    cnt *= values.length + 1;
  }

  results.push(cnt - 1);
}

console.log(results.join('\n'));
