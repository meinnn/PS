const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim();

const [N, M] = input.split(' ').map(Number);

const selected = Array(N + 1).fill(false);
const select = Array(M);
const result = [];

function perm(cnt) {
  if (cnt === M) {
    result.push(select.join(' '));
    return;
  }

  for (let i = 1; i <= N; i++) {
    if (!selected[i]) {
      selected[i] = true;
      select[cnt] = i;
      perm(cnt + 1);
      selected[i] = false;
    }
  }
}

perm(0);
console.log(result.join('\n'));
