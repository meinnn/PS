function solution(friends, gifts) {
    const nameMap = {};
    let id = 0;
    
    for (let name of friends) {
        if (!nameMap[name]) {
            nameMap[name] = id++;
        }
    }
    
    // 선물 지수 = (내가 준 선물 수) - (받은 선물 수)
    const point = Array(friends.length).fill(0);
    // 선물 교환 기록
    const trade = Array.from({length: friends.length}, () => Array(friends.length).fill(0));
    
    for (let gift of gifts) {
        const [A, B] = gift.split(' ');
        const id1 = nameMap[A];
        const id2 = nameMap[B];
        
        trade[id1][id2]++;
        point[id1]++;
        point[id2]--;
    }
    
    const nextMonthGifts = Array(friends.length).fill(0); // 다음 달에 받을 선물 수
    
    for (let i=0; i < id; i++) {
        for (let j=i+1; j < id; j++) {
            const given = trade[i][j];
            const taken = trade[j][i];
            
            // 더 많은 선물을 준 사람이 선물을 하나 받는다.
            if (given > taken) {
                nextMonthGifts[i]++;
            } else if (given < taken) {
                nextMonthGifts[j]++;
            } else {
                // 기록 없거나 같은 경우 
                // 선물 지수가 더 큰 사람이 하나 받음
                if (point[i] === point[j]) continue;
                const bigger = point[i] > point[j] ? i : j;
                nextMonthGifts[bigger]++;
            }
        }
    }
    
    return Math.max(...nextMonthGifts);
}