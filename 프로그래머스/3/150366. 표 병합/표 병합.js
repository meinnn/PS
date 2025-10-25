function solution(commands) {
    const table = Array.from({length: 51}, () => Array(51).fill(null));
    const parent = Array.from({length: 51}, (_, i) => Array.from({length: 51}, (_, j) => [i, j]))
    
    const find = (r, c) => {
        const [px, py] = parent[r][c];
        if (px === r && py === c) return [r, c];
        
        return (parent[r][c] = find(px, py));
    }
            
    const union = (r1, c1, r2, c2) => {
        const [ax, ay] = find(r1, c1);
        const [bx, by] = find(r2, c2);
        if (ax === bx && ay === by) return;
    
        if (!table[ax][ay] && table[bx][by]) {
            table[ax][ay] = table[bx][by];
        } else if (table[ax][ay]) {
            table[bx][by] = table[ax][ay];
        }
        
        parent[bx][by] = [ax, ay];
    }
    
    const print = [];
    
    for (const command of commands) {
        const [com, ...rest] = command.split(' ');
        
        if (com === 'UPDATE') {
            if (rest.length === 3) {
                const [r, c, value] = rest;
                const [px, py] = find(r, c);
                table[px][py] = value;
            } else {
                const [v1, v2] = rest;
                for (let i = 1; i <= 50; i++) {
                    for (let j = 1; j <= 50; j++) {
                        const [px, py] = find(i, j);
                        if (table[px][py] === v1) {
                            table[px][py] = v2;
                        }
                    }
                }
            }
        } else if (com === 'MERGE') {
            const [r1, c1, r2, c2] = rest;
            union(r1, c1, r2, c2);
        } else if (com === 'UNMERGE') {
            const [r, c] = rest;
            const [px, py] = find(r, c);
            const value = table[px][py];
            const reset = [];
            
            for (let i = 1; i <= 50; i++) {
                for (let j = 1; j <= 50; j++) {
                    const p = find(i, j);
                    if (p[0] === px && p[1] === py) {
                        reset.push([i, j]);
                    }
                }
            }
            
            for (const [i, j] of reset) {
                table[i][j] = null;
                parent[i][j] = [i, j];
            }
            
            table[r][c] = value;
            
        } else if (com === 'PRINT') {
            const [r, c] = rest;
            const [px, py] = find(r, c);
            print.push(table[px][py] ?? 'EMPTY');
        }
        
       
    }
    
    return print;
}
