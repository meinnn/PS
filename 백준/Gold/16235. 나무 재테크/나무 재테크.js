const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M, K] = input[0].split(' ').map(Number);
const A = input.slice(1, N + 1).map((line) => line.split(' ').map(Number));

const nutrients = Array.from({ length: N }, () => Array(N).fill(5)); // 초기 양분 5
const trees = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => [])
); // 나무 배열

for (let i = N + 1; i < input.length; i++) {
  const [x, y, z] = input[i].split(' ').map(Number);
  trees[x - 1][y - 1].push(z); // 나이만 저장
}

// 번식 방향
const dx = [-1, -1, -1, 0, 0, 1, 1, 1];
const dy = [-1, 0, 1, -1, 1, -1, 0, 1];

for (let year = 0; year < K; year++) {
  let dead = [];

  // 1. 봄 - 나무가 자신의 나이만큼 양분을 먹음
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (trees[i][j].length === 0) continue;

      let alive = [];
      trees[i][j].sort((a, b) => a - b); // 어린 나무부터 먹음

      for (let age of trees[i][j]) {
        if (nutrients[i][j] >= age) {
          nutrients[i][j] -= age;
          alive.push(age + 1); // 나이 증가
        } else {
          dead.push([i, j, age]); // 죽은 나무 저장
        }
      }
      trees[i][j] = alive;
    }
  }

  // 2. 여름 - 죽은 나무가 양분이 됨
  while (dead.length > 0) {
    const [r, c, age] = dead.pop();
    nutrients[r][c] += Math.floor(age / 2);
  }

  // 3. 가을 - 나무 번식
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (trees[i][j].length === 0) continue;

      for (let age of trees[i][j]) {
        if (age % 5 !== 0) continue;

        for (let d = 0; d < 8; d++) {
          let ni = i + dx[d];
          let nj = j + dy[d];
          if (ni < 0 || ni >= N || nj < 0 || nj >= N) continue;
          trees[ni][nj].push(1); // 나이 1인 나무 추가
        }
      }
    }
  }

  // 4. 겨울 - 땅에 양분 추가
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      nutrients[i][j] += A[i][j];
    }
  }
}

// 살아남은 나무 개수 계산
console.log(trees.flat(2).length);
