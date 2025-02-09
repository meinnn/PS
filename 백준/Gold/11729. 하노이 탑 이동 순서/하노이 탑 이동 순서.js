const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const N = Number(fs.readFileSync(filePath).toString().trim());

const result = [];
function hanoi(cnt, from, tmp, to) {
  if (cnt === 0) return;

  // 시작 기둥에서 맨 아래 원판 빼고 나머지 원판들을 임시 기둥으로 옮기고
  hanoi(cnt - 1, from, to, tmp);
  // 맨 아래 원판 옮긴 후
  result.push([from, to]);
  // 임시 기둥에 옮겨진 원판들을 목적 기둥으로 옮김
  hanoi(cnt - 1, tmp, from, to);
}

hanoi(N, 1, 2, 3);
console.log(result.length);
console.log(result.map((e) => e.join(' ')).join('\n'));
