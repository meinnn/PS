const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const n = +input[0];
const k = +input[1];
const cards = input.slice(2).map(Number);

const select = Array(k);
const selected = Array(n).fill(false);
const result = new Set();

function perm(cnt) {
  if (cnt === k) {
    result.add(select.join(''));
    return;
  }

  for (let i = 0; i < n; i++) {
    if (selected[i]) continue;
    selected[i] = true;
    select[cnt] = cards[i];
    perm(cnt + 1);
    selected[i] = false;
  }
}

perm(0);
console.log(result.size);
