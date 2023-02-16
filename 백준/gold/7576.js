const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n').map(Number);
const input = fs.readFileSync('../input.txt').toString().trim().split('\n');
const [M, N] = input.shift().split(' ').map(e => +e);

const box = [...Array(N)].map(() => []);
let ripen = [];

for (let i = 0; i < N; i++) {
    box[i] = input[i].split(' ').map(e => +e);
    for (let j = 0; j < M; j++) {
        // 익은 토마토 enqueue
        if (box[i][j] === 1) {
            ripen.push([j, i]);
        }
    }
}

let day = 0;

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

// 하루 지날 때마다 새로 익은 토마토 갱신
let ripe = [];


while (ripen.length) {
    // shift 썼더니 시간 초과... pop 해도 상관없어서 씀
    // shift 최악 O(n), pop O(1)
    const [x, y] = ripen.pop();

    for (let i = 0; i < 4; i++) {
        const [nx, ny] = [x + dx[i], y + dy[i]];

        if (0 > nx || nx >= M || 0 > ny || ny >= N) continue;

        // 인접한 토마토 안 익었으면 익게 함
        if (box[ny][nx] === 0) {
            box[ny][nx] = 1;
            // 새로 익은 배열에 추가
            ripe.push([nx, ny]);
        }
    }

    // 익은 토마토 다 탐색했으면
    if (ripen.length === 0) {
        // 새로 익은 토마토 없으면 탐색 중지
        if (ripe.length === 0) break;
        // 새로 익은 토마토 있었으면 하루 더
        day++;
        ripen = ripe;
        ripe = [];
    }
}

// 안 익은 토마토 있으면 -1
console.log(box.flat().includes(0) ? -1 : day);