function solution(cap, n, deliveries, pickups) {
    const delstack = [];
    const pickstack = [];
    
    for (let i = 0; i < n; i++) {
        if (deliveries[i] > 0) {
            delstack.push(i);
        }
        if (pickups[i] > 0) {
            pickstack.push(i);
        }
    }
    
    let del = cap;
    let pick = cap;
    let dist = 0;
    
    while (delstack.length > 0 || pickstack.length > 0) {
        dist += 2 * (Math.max((delstack[delstack.length - 1] || 0),
                        (pickstack[pickstack.length - 1] || 0)) + 1);
        
        while (del > 0) {
            const pop = delstack.pop();
            const delivery = Math.min(del, deliveries[pop]);
            if (deliveries[pop] > delivery) {
                deliveries[pop] -= delivery;
                delstack.push(pop);
            }
            del -= delivery;
        }
        
        while (pick > 0) {
            const pop = pickstack.pop();
            const pickup = Math.min(pick, pickups[pop]);
            if (pickups[pop] > pickup) {
                pickups[pop] -= pickup;
                pickstack.push(pop);
            }
            pick -= pickup;
        }
        
        del = cap;
        pick = cap;
    }
    
    return dist;
}