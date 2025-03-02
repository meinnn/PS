class Node {
  constructor(value) {
    this.value = value;
    this.left = -1;
    this.right = -1;
  }
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = +input[0];
const tree = Array(N + 1)
  .fill(null)
  .map((_, i) => new Node(i));
const parentCheck = Array(N + 1).fill(false);

// 트리 구성
for (let i = 1; i <= N; i++) {
  const [idx, left, right] = input[i].split(' ').map(Number);

  if (left !== -1) {
    tree[idx].left = left;
    parentCheck[left] = true;
  }
  if (right !== -1) {
    tree[idx].right = right;
    parentCheck[right] = true;
  }
}

// 루트 노드 찾기
const root = parentCheck.indexOf(false, 1);

let columnIndex = 1;
const columnMap = {}; // { 노드 번호 : 열 번호 }
const levelMap = {}; // { 레벨: [최소 열, 최대 열] }

// 열 번호 계산
calcColumnIndex(root);

// 레벨별 최소, 최대 열 계산
dfs(root, 1);

// 최대 너비 찾기
let maxLevel = 1;
let maxWidth = 0;

for (const level in levelMap) {
  const [minCol, maxCol] = levelMap[level];
  const width = maxCol - minCol + 1;

  if (width > maxWidth) {
    maxWidth = width;
    maxLevel = Number(level);
  }
}

console.log(maxLevel, maxWidth);

function calcColumnIndex(node) {
  if (node === -1) return;

  calcColumnIndex(tree[node].left);
  columnMap[node] = columnIndex++;
  calcColumnIndex(tree[node].right);
}

function dfs(node, level) {
  if (node === -1) return;

  const col = columnMap[node];

  if (!levelMap[level]) {
    levelMap[level] = [col, col];
  } else {
    levelMap[level][0] = Math.min(levelMap[level][0], col);
    levelMap[level][1] = Math.max(levelMap[level][1], col);
  }

  dfs(tree[node].left, level + 1);
  dfs(tree[node].right, level + 1);
}
