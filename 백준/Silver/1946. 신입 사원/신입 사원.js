const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const T = +input[0];
let line = 1;

for (let t = 0; t < T; t++) {
  const N = +input[line++];
  const applicants = [];

  for (let i = 0; i < N; i++) {
    const [r1, r2] = input[line++].split(' ').map(Number);
    applicants.push([r1, r2]);
  }

  const sorted = applicants.sort((a, b) => a[0] - b[0]);
  let last;
  let cnt = 0;

  for (const [r1, r2] of sorted) {
    if (!last || r2 < last) {
      last = r2;
      cnt++;
    }
  }

  console.log(cnt);
}
