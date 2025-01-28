const fs = require('fs');
const [S, T] = fs.readFileSync(0, 'utf-8').trim().split('\n');

let answer = 0;
const arr = [...T];

while (arr.length > 0) {
  const last = arr.pop();

  // 문자열 뒤에 A 추가
  // 문자열 뒤집고 뒤에 B 추가
  if (last === 'B') {
    arr.reverse();
  }

  if (arr.join('') === S) {
    answer = 1;
    break;
  }
}

console.log(answer);
