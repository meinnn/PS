const fs = require('fs');
const [N, K] = fs.readFileSync('/dev/stdin').toString().split(' ').map(Number);

const visited = new Array(100001).fill(0);
const queue = [];

// BFS
queue.push(N);

while (queue.length > 0) {
    const x = queue.shift();

    for (const pos of [x + 1, x - 1, 2 * x]) {
        if (!visited[pos] && pos != N && 0 <= pos && pos <= 100000) {
            queue.push(pos);
            visited[pos] = visited[x] + 1;
        }
    }
    if (x === K) break;
}
console.log(visited[K]);