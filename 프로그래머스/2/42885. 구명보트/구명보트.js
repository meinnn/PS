function solution(people, limit) {
    people.sort((a, b) => a - b);
    
    let answer = 0;
    let head = 0;
    
    while (head < people.length) {
        const last = people[people.length - 1];
        if (limit < people[head] + last) {
            people.pop();
            answer++;
        } else {
            people.pop();
            head++;
            answer++;
        }
    }
    
    return answer;
}