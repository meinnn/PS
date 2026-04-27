function solution(n, q, ans) {
    const m = q.length;
    
    let possibleCodes = [];
    
    for (let i = 0; i < m; i++) {
        const combs = combination(q[i], ans[i]);
        if (i === 0) {
            for (const comb of combs) {
                const must = comb;
                const never = q[i].filter(e => !comb.includes(e));
                possibleCodes.push([must, never]);
            }
            continue;
        }
        
        const newPossibleCodes = [];
        for (const [must, never] of possibleCodes) {
            for (const comb of combs) {
                const newMust = comb;
                const newNever = q[i].filter(e => !comb.includes(e));
                
                const mustSet = new Set([...must, ...newMust]);
                const neverSet = new Set([...never, ...newNever]);
                
                if (mustSet.size > 5) continue;
                
                let isPossible = true;
                for (let num of mustSet) {
                    if (neverSet.has(num)) {
                        isPossible = false;
                        break;
                    }
                }
                
                if (isPossible) {
                    newPossibleCodes.push([Array.from(mustSet).sort((a, b) => a - b), 
                                           Array.from(neverSet).sort((a, b) => a - b)]);
                }
            }
        }
        
        possibleCodes = newPossibleCodes;
    }
    
    let result = 0;
    
    for (const [code, never] of possibleCodes) {
        if (code.length < 5) {
            const arr = Array.from({length: n}, (_, i) => i + 1)
                        .filter(e => !code.includes(e) && !never.includes(e));
            const more = combination(arr, 5 - code.length);
            result += more.length;
        } else if (code.length === 5) {
            result++;
        }
    }

    return result;
}

function combination(arr, count) {
    const selection = Array(count);
    const isSelected = Array(arr.length).fill(false);
    const result = [];
    
    const comb = (start, cnt) => {
        if (cnt === count) {
            result.push([...selection]);
            return;
        }
        
        for (let i = start; i < arr.length; i++) {
            if (!isSelected[i]) {
                selection[cnt] = arr[i];
                comb(i + 1, cnt + 1);
            }
        }
    }
    
    comb(0, 0);
    return result;
}