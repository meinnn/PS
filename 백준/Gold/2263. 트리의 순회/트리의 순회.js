const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

const n = Number(input[0]);
const inorder = input[1].split(' ').map(Number);
const postorder = input[2].split(' ').map(Number);

const tree = [];
tree.push(0); // 트리 인덱스 0

function findPreorder(inStart, inEnd, postStart, postEnd) {
  const root = postorder[postEnd];
  tree.push(root);

  if (postStart === postEnd) return; // 트리에 루트 하나만 있으면 종료

  let left = 0;
  for (let i = inStart; i <= inEnd; i++) {
    if (inorder[i] === root) break;
    left++;
  }

  if (left > 0)
    findPreorder(inStart, inStart + left - 1, postStart, postStart + left - 1);

  const right = inEnd - inStart - left;
  if (right > 0)
    findPreorder(inStart + left + 1, inEnd, postStart + left, postEnd - 1);
}

findPreorder(0, n - 1, 0, n - 1);
console.log(tree.slice(1).join(' '));
