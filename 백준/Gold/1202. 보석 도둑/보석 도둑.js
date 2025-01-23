class MaxHeap {
  constructor() {
    this.heap = [];
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }
  getLeftChildIndex(index) {
    return 2 * index + 1;
  }
  getRightChildIndex(index) {
    return 2 * index + 2;
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (
      index > 0 &&
      this.heap[this.getParentIndex(index)] < this.heap[index]
    ) {
      this.swap(index, this.getParentIndex(index));
      index = this.getParentIndex(index);
    }
  }

  // 최대값 제거
  remove() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return max;
  }

  heapifyDown() {
    let index = 0;

    while (this.getLeftChildIndex(index) < this.heap.length) {
      let largerChildIndex = this.getLeftChildIndex(index);

      if (
        this.getRightChildIndex(index) < this.heap.length &&
        this.heap[this.getRightChildIndex(index)] > this.heap[largerChildIndex]
      ) {
        largerChildIndex = this.getRightChildIndex(index);
      }

      if (this.heap[index] > this.heap[largerChildIndex]) break;

      this.swap(index, largerChildIndex);
      index = largerChildIndex;
    }
  }
}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);

const jewels = [];
for (let i = 1; i <= N; i++) {
  const [M, V] = input[i].split(' ').map(Number);
  jewels.push({ weight: M, value: V });
}

const bags = [];
for (let i = N + 1; i < input.length; i++) {
  bags.push(Number(input[i]));
}

// 보석: 무게 기준 내림차순 정렬
jewels.sort((a, b) => b.weight - a.weight);
// 가방: 무게 오름차순
bags.sort((a, b) => a - b);

const heap = new MaxHeap();
let sum = 0;
for (const bag of bags) {
  // 현재 가방에 넣을 수 있는 보석들 중
  while (jewels.length > 0 && jewels[jewels.length - 1].weight <= bag) {
    heap.insert(jewels.pop().value);
  }
  // 가장 가격 높은 보석 넣기
  sum += heap.remove();
}

console.log(sum);
