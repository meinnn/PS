const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim();

const [N, M] = input.split(' ').map(Number);

const select = Array(M);
const result = [];

function comb(start, cnt) {
  if (cnt === M) {
    result.push(select.join(' '));
    return;
  }

  for (let i = start; i <= N; i++) {
    select[cnt] = i;
    comb(i, cnt + 1);
  }
}

comb(1, 0);
console.log(result.join('\n'));
