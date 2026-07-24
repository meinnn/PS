function solution(routes) {
    routes.sort((a, b) => (a[1] - b[1]));
    
    let camera = 0;
    let last = -300001;
    
    for (const [enter, leave] of routes) {
        if (enter <= last) continue;
        camera++;
        last = leave;
    }
    
    return camera;
}