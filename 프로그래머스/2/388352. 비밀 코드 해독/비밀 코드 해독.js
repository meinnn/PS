function solution(n, q, ans) {
    const m = q.length;
    
    let possibleCodes = combination(Array.from({length: n}, (_, i) => i + 1), 5);
    const result = [];
    
    outer: for (const code of possibleCodes) {
        for (let i = 0; i < m; i++) {
            let correctCount = 0;
            for (const number of q[i]) {
                if (code.includes(number)) correctCount++;
            }
            if (correctCount === ans[i]) continue;
            else continue outer;
        }
        result.push(code);
    }
    
    return result.length;
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