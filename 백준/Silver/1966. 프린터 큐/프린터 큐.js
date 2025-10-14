const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const T = +input[0];
let line = 1;
const result = [];

for (let t = 0; t < T; t++) {
  const [N, M] = input[line++].split(' ').map(Number);
  const importance = input[line++].split(' ').map(Number);

  const sorted = [...importance].sort((a, b) => a - b);

  let i = 0;
  const queue = Array.from({ length: N }, (_, i) => i);
  let cnt = 0;

  while (true) {
    const idx = queue[i];
    if (importance[idx] >= sorted[sorted.length - 1]) {
      // 인쇄
      sorted.pop();
      cnt++;
      if (idx === M) {
        result.push(cnt);
        break;
      }
    } else {
      // 맨 뒤로
      queue.push(idx);
    }
    i++;
  }
}

console.log(result.join('\n'));
