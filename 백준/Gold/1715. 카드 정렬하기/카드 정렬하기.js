// js로 알고리즘 하면 안 되는 이유 ^.^*
class MinHeap {
  constructor() {
    this.heap = [];
  }

  // 부모와 자식 노드의 인덱스 계산
  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }
  getLeftChildIndex(index) {
    return 2 * index + 1;
  }
  getRightChildIndex(index) {
    return 2 * index + 2;
  }

  // 요소 교환
  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  // 요소 추가
  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  // 최소값 제거
  remove() {
    if (this.heap.length === 1) return this.heap.pop();
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return min;
  }

  // 힙 위로 정렬
  heapifyUp() {
    let index = this.heap.length - 1;
    while (
      index > 0 &&
      this.heap[this.getParentIndex(index)] > this.heap[index]
    ) {
      this.swap(index, this.getParentIndex(index));
      index = this.getParentIndex(index);
    }
  }

  // 힙 아래로 정렬
  heapifyDown() {
    let index = 0;
    while (this.getLeftChildIndex(index) < this.heap.length) {
      let smallerChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);

      if (
        rightChildIndex < this.heap.length &&
        this.heap[rightChildIndex] < this.heap[smallerChildIndex]
      ) {
        smallerChildIndex = rightChildIndex;
      }

      if (this.heap[index] <= this.heap[smallerChildIndex]) break;

      this.swap(index, smallerChildIndex);
      index = smallerChildIndex;
    }
  }
}

const fs = require('fs');
const [N, ...arr] = fs.readFileSync(0, 'utf-8').trim().split('\n').map(Number);

const heap = new MinHeap();
for (const num of arr) {
  heap.insert(num);
}

let answer = 0;

while (heap.heap.length > 1) {
  const sum = heap.remove() + heap.remove();

  answer += sum;
  heap.insert(sum);
}

console.log(answer);
