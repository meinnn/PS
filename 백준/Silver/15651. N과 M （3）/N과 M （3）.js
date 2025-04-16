const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim();

const [N, M] = input.split(' ').map(Number);

const select = Array(M);
const result = [];

function perm(cnt) {
  if (cnt === M) {
    result.push(select.join(' '));
    return;
  }

  for (let i = 1; i <= N; i++) {
    select[cnt] = i;
    perm(cnt + 1);
  }
}

perm(0);
console.log(result.join('\n'));
