function solution(coin, cards) {
    const n = cards.length;
    const hand = new Set(cards.slice(0, n / 3));
    const opened = new Set([]);
    let round = 1;
    
    for (let i = n / 3; i < cards.length; i += 2) {
        opened.add(cards[i]).add(cards[i + 1]);
        let canPass = false;
        
        // 코인 0개
        for (const card of hand) {
            const target = n+1 - card;
            if (hand.has(target)) {
                hand.delete(card);
                hand.delete(target);
                canPass = true;
                break;
            }
        }
        if (canPass) {
            round++;
            continue;
        }
        
        // 코인 1개
        if (coin >= 1) {
            for (const card of hand) {
                const target = n+1 - card;
                if (opened.has(target)) {
                    hand.delete(card);
                    opened.delete(target);
                    canPass = true;
                    coin--;
                    break;
                }
            }
            if (canPass) {
                round++;
                continue;
            }
        }
        
        
        // 코인 2개
        if (coin >= 2) {
            for (const card of opened) {
                const target = n+1 - card;
                if (opened.has(target)) {
                    opened.delete(card);
                    opened.delete(target);
                    canPass = true;
                    coin -= 2;
                    break;
                }
            }
        }
        if (canPass) {
            round++;
            continue;
        }
        
        break;
    }
    
    return round;
}
