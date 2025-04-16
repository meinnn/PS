const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input[0]);
const S = input.slice(1).map((row) => row.split(' ').map(Number));

let result = Infinity;

function makeTeam(idx, start, link) {
  if (idx === N) {
    if (start.length === N / 2 && link.length === N / 2) {
      let ss = 0;
      let ls = 0;

      for (let i = 0; i < N / 2; i++) {
        for (let j = i + 1; j < N / 2; j++) {
          ss += S[start[i]][start[j]] + S[start[j]][start[i]];
          ls += S[link[i]][link[j]] + S[link[j]][link[i]];
        }
      }

      result = Math.min(result, Math.abs(ss - ls));
    }
    return;
  }

  if (start.length < N / 2) makeTeam(idx + 1, [...start, idx], link);
  if (link.length < N / 2) makeTeam(idx + 1, start, [...link, idx]);
}

makeTeam(1, [0], []); // 대칭 제거

console.log(result);
