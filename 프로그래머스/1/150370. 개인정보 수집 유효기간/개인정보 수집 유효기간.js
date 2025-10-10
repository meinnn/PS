function solution(today, terms, privacies) {
    const termsMap = {};
    for (const term of terms) {
        const [key, period] = term.split(' ');
        termsMap[key] = parseInt(period);
    }
    
    const expired = [];
    
    for (let i = 0; i < privacies.length; i++) {
        const [date, term] = privacies[i].split(' ');
        if (isExpired(today, termsMap[term], date)) {
            expired.push(i + 1);
        }
    }
    
    expired.sort((a, b) => (a - b));
    
    return expired;
}

function isExpired(today, period, date) {
    const year = Math.floor(period / 12);
    const month = period - year * 12;
    
    const signedAt = date.split('.').map(Number);
    
    let expireAt = [];
    expireAt.push(signedAt[0] + year);
    expireAt.push(signedAt[1] + month);
    expireAt.push(signedAt[2]);
    
    if (expireAt[1] > 12) {
        expireAt[0] += 1;
        expireAt[1] -= 12;
    }
    
    const [todayYear, todayMonth, todayDay] = today.split('.').map(Number);
    
    if (todayYear > expireAt[0]) return true;
    if (todayYear === expireAt[0] && todayMonth > expireAt[1]) return true;
    if (todayYear === expireAt[0]
       && todayMonth === expireAt[1]
       && todayDay >= expireAt[2]) {
        return true;
    }
    return false;
}