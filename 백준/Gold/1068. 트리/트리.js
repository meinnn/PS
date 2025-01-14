const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

const N = Number(input[0]);
const parents = input[1].split(' ').map(Number);
const remove = Number(input[2]);

const tree = Array.from({ length: N }, () => []);
let root;

for (let i = 0; i < N; i++) {
  if (parents[i] === -1) {
    root = i;
    continue;
  }
  tree[parents[i]].push(i);
}

const visited = Array(N).fill(false);
let leaf = 0;

const dfs = (v) => {
  if (v === remove) return;
  visited[v] = true;

  for (const node of tree[v]) {
    if (visited[node] || node === remove) continue;
    dfs(node);
  }

  if (tree[v].length === 0 || (tree[v].length === 1 && tree[v][0] === remove))
    leaf++;
};

dfs(root);
console.log(leaf);
