const fs = require('fs');
const [N, limits, M, boxes] = fs.readFileSync(0, 'utf-8')
  .trim()
  .split('\n')
  .map((line, index) =>
    index % 2 === 0
      ? Number(line)
      : line
          .split(' ')
          .map(Number)
          .sort((a, b) => b - a)
  );

if (boxes[0] > limits[0]) {
  console.log(-1);
  process.exit();
}

let time = 0;
let cnt = 0;

while (cnt < M) {
  let idx = 0;
  for (let j = 0; j < M; j++) {
    if (boxes[j] > 0 && boxes[j] <= limits[idx]) {
      boxes[j] = 0;
      cnt++;
      idx++;
      if (idx >= N) break;
    }
  }
  time++;
}

console.log(time);
