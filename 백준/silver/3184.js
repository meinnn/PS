// input
const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n').map(e => +e);
const input = fs.readFileSync('../input.txt').toString().split('\n');
const [R, C] = input.shift().split(' ').map(e => +e);
const yard = [];

for (let i = 0; i < R; i++) {
    yard.push(input[i].split('').slice(0, C));
}


// solution
// 상하좌우 
const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

const visited = Array.from({ length: R }, () => new Array(C).fill(false));
const queue = [];

let total_wolves = 0;
let total_sheeps = 0;


const BFS = (a, b) => {
    let wolf = 0, sheep = 0;
    visited[a][b] = true;
    queue.push([a, b]);

    while (queue.length > 0) {
        const [x, y] = queue.shift();

        if (yard[x][y] === 'v') {
            wolf++;
        } else if (yard[x][y] === 'o') {
            sheep++;
        }

        for (let i = 0; i < 4; i++) {
            const [nx, ny] = [x + dx[i], y + dy[i]];

            if (0 <= nx && nx < R && 0 <= ny && ny < C) {
                if (yard[nx][ny] != '#' && !visited[nx][ny]) {
                    queue.push([nx, ny]);
                    visited[nx][ny] = 1;
                }
            }
        }
    }
    
    if (sheep > wolf) {
        total_sheeps += sheep;
    } else {
        total_wolves += wolf;
    }
};


for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
        if (yard[i][j] != '#' && visited[i][j] == 0 && (yard[i][j] === 'v' || yard[i][j] === 'o'))
            BFS(i, j);
    }
}

console.log(total_sheeps, total_wolves);