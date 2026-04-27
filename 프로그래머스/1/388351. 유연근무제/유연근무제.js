function solution(schedules, timelogs, startday) {
    let count = 0;
    
    for (let i = 0; i < schedules.length; i++) {
        const dead = [Math.floor(schedules[i] / 100), schedules[i] % 100 + 10];
        if (dead[1] >= 60) {
            dead[0] += 1;
            dead[1] -= 60;
        }
        
        let rewarded = true;
        
        for (let day = 0; day < 7; day++) {
            const currentDay = (startday + day) % 7;
            if (currentDay === 0 || currentDay === 6) continue;
            
            const hour = Math.floor(timelogs[i][day] / 100);
            const min = timelogs[i][day] % 100;
            
            if (hour > dead[0] || hour === dead[0] && min > dead[1]) {
                rewarded = false;
                break;
            }
        }
        
        if (rewarded) count++;
    }
    
    return count;
}