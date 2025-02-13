const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const result = [];
let line = 0;
let T = Number(input[line++]);
while (T-- > 0) {
  const parent = new Map();
  const size = new Map();

  let F = Number(input[line++]);
  while (F-- > 0) {
    const [user1, user2] = input[line++].split(' ');

    union(user1, user2);
    result.push(size.get(findSet(user1)));
  }

  function findSet(x) {
    if (!parent.has(x)) {
      parent.set(x, x);
      size.set(x, 1);
      return x;
    }

    if (parent.get(x) !== x) {
      parent.set(x, findSet(parent.get(x))); // 경로 압축
    }
    return parent.get(x);
  }

  function union(x, y) {
    let rootX = findSet(x);
    let rootY = findSet(y);

    if (rootX !== rootY) {
      // 항상 rootX가 더 큰 집합이 되도록
      if (size.get(rootX) < size.get(rootY)) {
        [rootX, rootY] = [rootY, rootX];
      }

      parent.set(rootY, rootX);
      size.set(rootX, size.get(rootX) + size.get(rootY)); // 집합 크기 갱신
    }
  }
}

console.log(result.join('\n'));
