const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = +input[0];
const city = input.slice(1).map((row) => row.split(' ').map(Number));

let time = 0;

outer: for (let i = 0; i < N; i++) {
  for (let j = i + 1; j < N; j++) {
    let isNeeded = true;
    for (let k = 0; k < N; k++) {
      if (k === i || k === j) continue;
      // 다른 도시 거쳐 갈 수 있으면 직접 잇는 도로 불필요
      if (city[i][j] === city[i][k] + city[k][j]) {
        isNeeded = false;
        break;
      }
      // 최단 거리 모순
      if (city[i][j] > city[i][k] + city[k][j]) {
        time = -1;
        break outer;
      }
    }
    if (isNeeded) time += city[i][j];
  }
}

console.log(time);
