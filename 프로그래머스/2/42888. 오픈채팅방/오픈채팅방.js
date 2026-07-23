function solution(record) {
    const userMap = new Map();
    const result = [];
    
    for (const rec of record) {
        const [act, userId, nickname] = rec.split(' ');
        
        switch (act) {
            case 'Enter':
            userMap.set(userId, nickname);
                result.push([userId, "님이 들어왔습니다."]);
                break;
            case 'Leave':
                result.push([userId, "님이 나갔습니다."]);
                break;
            case 'Change':
                userMap.set(userId, nickname);
                break;
        }
    }
    
    const answer = [];
    
    for (let [userId, text] of result) {
        answer.push(userMap.get(userId) + text);
    }
    
    return answer;
}