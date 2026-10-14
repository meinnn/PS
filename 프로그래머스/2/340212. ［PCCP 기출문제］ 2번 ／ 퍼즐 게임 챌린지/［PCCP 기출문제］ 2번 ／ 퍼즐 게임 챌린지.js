function solution(diffs, times, limit) {
    
    const canSolve = (level) => {
        let solvingTime = 0;
        
        for (let i = 0; i < diffs.length; i++) {
            if (solvingTime > limit) return false;
            
            if (diffs[i] <= level) {
                solvingTime += times[i];
            } else {
                solvingTime += (times[i] + times[i - 1]) * (diffs[i] - level) + times[i];
            }
        }
        
        return solvingTime <= limit;
    }
    
    let left = 1;
    let right = 100000;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (canSolve(mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    
    return left;
}