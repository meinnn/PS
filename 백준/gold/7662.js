// readfile로 하면 메모리 초과....... 라서 readline으로 고침

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

/* 
Binary minHeap 으로 우선순위 큐 구현

leftChildIdx = (parentIdx * 2) + 1
rightChildIdx = (parentIdx * 2) + 2
parentIdx = (childIdx - 1) / 2]
*/

class MinHeap {
    constructor() {
        this.heap = [];
    }

    getLeftChildIdx = (parentIdx) => parentIdx * 2 + 1;
    getRightChildIdx = (parentIdx) => parentIdx * 2 + 2;
    getParentIdx = (childIdx) => Math.floor((childIdx - 1) / 2);

    isEmpty() {
        return this.heap.length === 0;
    }

    swap(x, y) {
        [this.heap[x], this.heap[y]] = [this.heap[y], this.heap[x]];
    }

    insert(num) {
        // 가장 마지막에 삽입, minheap 되게 재정렬
        this.heap.push(num);
        this.heapifyUp();
    }

    heapifyUp() {
        // 가장 마지막 요소 idx
        let idx = this.heap.length - 1;

        // 루트 노드까지
        while (idx > 0) {
            const parentIdx = this.getParentIdx(idx);

            if (this.heap[parentIdx] <= this.heap[idx]) break;

            // 부모 노드 값이 자식 노드 값보다 크면 위치 교환
            this.swap(parentIdx, idx);
            idx = parentIdx;
        }
    }

    del() {
        if (this.heap.length < 1) return;
        if (this.heap.length === 1) return this.heap.pop();

        const remove = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();
        return remove;
    }

    heapifyDown() {
        const len = this.heap.length;
        let idx = 0;
        let leftChildIdx = this.getLeftChildIdx(idx);
        let rightChildIdx = this.getRightChildIdx(idx);
        let smallerIdx = idx;

        while (idx < len) {
            // 자식 노드 중 더 작은 값 가진 idx 찾기
            if (this.heap[leftChildIdx] < this.heap[smallerIdx]) {
                smallerIdx = leftChildIdx;
            }
            if (rightChildIdx < len && this.heap[rightChildIdx] < this.heap[smallerIdx]) {
                smallerIdx = rightChildIdx;
            }

            // 자식 노드에 더 작은 값이 있을 때 (부모 노드가 자식 노드보다 클 때)
            if (smallerIdx != idx) {
                // 부모 자식 위치 교환, 다시 정렬
                this.swap(idx, smallerIdx);
                idx = smallerIdx;
                leftChildIdx = this.getLeftChildIdx(smallerIdx);
                rightChildIdx = this.getRightChildIdx(smallerIdx);

            } else break;
        }
    }
}

let maxHeap = new MinHeap();
let minHeap = new MinHeap();
let valid = {};
const answer = [];
let t = null,
    k = 0;

rl.on("line", line => {
    if (!t) {
        t = +line;
        return;
    }
    if (k === 0) {
        k = +line;
        minHeap = new MinHeap();
        maxHeap = new MinHeap();
        valid = {};
        return;
    }

    const [exp, num] = line.split(' ');

    switch (exp) {
        case 'I':
            minHeap.insert(+num);
            maxHeap.insert(-num);
            valid[+num] = (valid[+num] || 0) + 1;
            break;
        case 'D':
            if (+num === 1) {
                while (!maxHeap.isEmpty()) {
                    const max = -maxHeap.del();
                    if (valid[max] > 0) {
                        valid[max]--;
                        break;
                    }
                }
            }
            // 최솟값 삭제
            else if (+num === -1) {
                while (!minHeap.isEmpty()) {
                    const min = minHeap.del();
                    if (valid[min] > 0) {
                        valid[min]--;
                        break;
                    }
                }
            }
            break;
    }

    if (--k === 0) {
        // 쓸모없는 값 정리
        while (!minHeap.isEmpty() && valid[minHeap.heap[0]] === 0) {
            minHeap.del();
        }
        while (!maxHeap.isEmpty() && valid[-maxHeap.heap[0]] === 0) {
            maxHeap.del();
        }
        
        // 출력
        if (minHeap.isEmpty()) {
            answer.push('EMPTY');
        } else {
            answer.push(`${-maxHeap.heap[0]} ${minHeap.heap[0]}`);
        }
    }

}).on("close", () => {
    console.log(answer.join('\n'));
    process.exit();
});