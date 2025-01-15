const fs = require('fs');

// 전위 순회 (루트 - 왼쪽 - 오른쪽)
const preOrder = fs.readFileSync(0, 'utf-8').trim().split('\n').map(Number);
// 후위 순회 (왼쪽 - 오른쪽 - 루트)
const postOrder = [];

function constructTree(start, end) {
  if (start > end) return;

  const root = preOrder[start];
  let right = start + 1;

  // 오른쪽 서브트리의 시작 index 찾기
  while (right <= end && preOrder[right] < root) {
    right++;
  }

  // 왼쪽 서브트리
  constructTree(start + 1, right - 1);
  // 오른쪽
  constructTree(right, end);
  // 루트
  postOrder.push(root);
}

constructTree(0, preOrder.length - 1);
console.log(postOrder.join('\n'));
