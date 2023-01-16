const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n').map(e => +e);
const input = fs.readFileSync('../input.txt').toString().split('\n');
const T = Number(input.shift());
let M,N,K,board;
let visited;

// 상하좌우 
const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

const DFS = (x, y) => {
    visited[x][y] = true;

    for (let i = 0; i < 4; i++) {
        const [nx, ny] = [x + dx[i], y + dy[i]];

        if (0 <= nx && nx< M && 0 <= ny && ny < N) {
            if (board[nx][ny] === 1 && !visited[nx][ny]) {
                DFS(nx, ny);
            }
        }
    }
};


for (let i = 0; i < T; i++) {
    // board 생성
    [M, N, K] = input.shift().split(' ').map(e => +e);
    board = Array.from({length: M}, () => Array(N).fill(0));
    for (let j = 0; j < K; j++) {
        const [x, y] = input.shift().split(' ').map(e => +e);
        board[x][y] = 1;
    }

    // 지렁이 수 구하기
    let cnt = 0;
    visited = Array.from({length: M}, () => Array(N).fill(false));

    for (let j = 0; j < M; j++) {
        for (let k = 0; k < N; k++) {
            if (board[j][k] === 1 && !visited[j][k]) {
                cnt++;
                DFS(j,k);
            }
        }
    }

    console.log(cnt);
}