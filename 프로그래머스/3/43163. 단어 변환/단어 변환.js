function solution(begin, target, words) {
    if (!words.includes(target)) return 0;
    
    const checked = new Set();
    checked.add(begin);
    let q = [begin];
    let head = 0;
    let step = 0;
    
    outer: while (head < q.length) {
        let size = q.length;
        const temp = [];
        
        while (size-- > 0) {
            const cur = q.pop();
            if (cur === target) break outer;
            
            for (const word of words) {
                if (!checked.has(word) && isAdj(cur, word)) {
                    temp.push(word);
                    checked.add(word);
                }
            }
        }
        
        q = temp;
        step++;
    }
    
    return step;
}

function isAdj(word, target) {
    let diff = 0;
    
    for (let i = 0; i < word.length; i++) {
        if (word[i] !== target[i]) {
            if (diff === 0) diff++;
            else return false;
        }
    }
    
    return diff === 1;
}