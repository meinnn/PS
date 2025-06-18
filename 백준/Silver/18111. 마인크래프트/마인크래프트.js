const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M, B] = input[0].split(' ').map(Number);
const ground = input.slice(1).map((line) => line.split(' ').map(Number));

let minTime = Infinity;
let height = 0;

// 땅 높이 0 ~ 256
for (let h = 0; h <= 256; h++) {
  let remove = 0;
  let add = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (ground[i][j] > h) {
        remove += ground[i][j] - h;
      } else if (ground[i][j] < h) {
        add += h - ground[i][j];
      }
    }
  }

  if (remove + B >= add) {
    const time = remove * 2 + add;
    if (time < minTime || (time === minTime && h > height)) {
      minTime = time;
      height = h;
    }
  }
}

console.log(minTime, height);
