const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n').map(Number);
const input = fs.readFileSync('../input.txt').toString().trim().split('\n');
const N = Number(input.shift());
const M = Number(input.shift());

const graph = [...Array(N + 1)].map(() => []);
const visited = [...Array(N + 1)].fill(false);
let answer = 0;

for (let i = 0; i < M; i++) {
    const [v1, v2] = input[i].split(' ').map(e => +e);
    graph[v1].push(v2);
    graph[v2].push(v1);
}

const dfs = (v) => {
    visited[v] = true;

    for (const vertex of graph[v]) {
        if (!visited[vertex]) {
            visited[vertex] = true;
            answer++;
            dfs(vertex);
        }
    }
};

dfs(1);
console.log(answer);