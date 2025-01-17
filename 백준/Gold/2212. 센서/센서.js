const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

const N = Number(input[0]);
const K = Number(input[1]);
const sensors = input[2].split(' ').map(Number);

sensors.sort((a, b) => a - b);

const dist = [];
for (let i = 1; i < N; i++) {
  dist.push(sensors[i] - sensors[i - 1]);
}

dist.sort((a, b) => a - b);
// 집중국이 K개 => K-1 번 큰 거리를 건너뛰고 설치
for (let i = 0; i < K - 1; i++) dist.pop();

console.log(dist.reduce((acc, cur) => acc + cur, 0));
