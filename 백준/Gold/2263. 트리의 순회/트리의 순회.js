const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

const n = Number(input[0]);
const inorder = input[1].split(' ').map(Number);
const postorder = input[2].split(' ').map(Number);

// inorder 값의 인덱스를 저장한 Map
const inorderMap = new Map();
inorder.forEach((value, index) => inorderMap.set(value, index));

const tree = [];

function findPreorder(inStart, inEnd, postStart, postEnd) {
  if (inStart > inEnd || postStart > postEnd) return;

  const root = postorder[postEnd];
  tree.push(root); // 트리 저장

  const rootIndex = inorderMap.get(root);
  const leftCount = rootIndex - inStart; // 왼쪽 서브트리 크기 계산

  // 왼쪽 서브트리
  findPreorder(inStart, rootIndex - 1, postStart, postStart + leftCount - 1);

  // 오른쪽 서브트리
  findPreorder(rootIndex + 1, inEnd, postStart + leftCount, postEnd - 1);
}

findPreorder(0, n - 1, 0, n - 1);
console.log(tree.join(' '));
