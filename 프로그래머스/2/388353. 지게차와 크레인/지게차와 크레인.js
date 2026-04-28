
function solution(storage, requests) {
    const n = storage.length;
    const m = storage[0].length;
    
    const map = Array.from({length: n + 2}, () => Array(m + 2).fill('.'));
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            map[i][j] = storage[i-1][j-1];
        }
    }
    
    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];
    
    
    for (const req of requests) {
        const isOutside = Array.from({length: n + 2}, () => Array(m + 2).fill(false));
        const q = [[0, 0]];
        isOutside[0][0] = true;
        
        let head = 0;
        while (head < q.length) {
            const [x, y] = q[head++];
            
            for (let i = 0; i < 4; i++) {
                const nx = x + dx[i];
                const ny = y + dy[i];
                if (nx < 0 || nx >= n + 2 || ny < 0 || ny >= m + 2 || isOutside[nx][ny]) continue;
                
                if (map[nx][ny] === '.') {
                    isOutside[nx][ny] = true;
                    q.push([nx, ny]);
                }
            }
        }
        
        const out = req[0];
        
        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= m; j++) {
                if (map[i][j] !== out) continue;
                
                if (req.length === 1) {
                    for (let d = 0; d < 4; d++) {
                        if (isOutside[i + dx[d]][j + dy[d]]) {
                            map[i][j] = '.';
                            break;
                        }
                    }
                } else {
                    map[i][j] = '.';
                }
            }
        }
        
    }
    
    return map.flat().filter(e => e !== '.').length;
}
