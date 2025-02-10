const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let line = 0;
const result = [];
while (true) {
  let [N, M] = input[line++].split(' ').map(Number);
  if (N === 0 && M === 0) break;

  let parent = Array.from({ length: N + 1 }, (v, i) => i); // 각 집합의 root
  let weight = Array(N + 1).fill(0); // 각 root와의 무게 차이 저장

  for (let i = 0; i < M; i++) {
    let parts = input[line++].split(' ');

    if (parts[0] === '!') {
      let [_, a, b, w] = parts.map(Number);
      union(a, b, w);
    } else if (parts[0] === '?') {
      let [_, a, b] = parts.map(Number);

      if (findRoot(a) === findRoot(b)) {
        result.push(weight[b] - weight[a]);
      } else {
        result.push('UNKNOWN');
      }
    }
  }

  function findRoot(x) {
    if (x === parent[x]) return x;

    const root = findRoot(parent[x]);
    weight[x] += weight[parent[x]]; // 부모와의 무게차 누적
    return (parent[x] = root);
  }

  function union(a, b, w) {
    const rootA = findRoot(a);
    const rootB = findRoot(b);

    if (rootA !== rootB) {
      parent[rootB] = rootA;
      weight[rootB] = weight[a] - weight[b] + w; // w[rootB] = 0 => rootA와의 무게차로 갱신
    }
  }
}

console.log(result.join('\n'));
