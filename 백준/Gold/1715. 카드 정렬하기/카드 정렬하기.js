const fs = require('fs');
const [N, ...arr] = fs.readFileSync(0, 'utf-8').trim().split('\n').map(Number);
arr.sort((a, b) => b - a);

let answer = 0;

while (arr.length > 1) {
  const sum = arr.pop() + arr.pop();
  answer += sum;

  let added = false;
  for (let i = 0; i < arr.length; i++) {
    if (sum > arr[i]) {
      arr.splice(i, 0, sum);
      added = true;
      break;
    }
  }

  if (!added) {
    arr.push(sum); // 배열 끝에 추가
  }
}

console.log(answer);
