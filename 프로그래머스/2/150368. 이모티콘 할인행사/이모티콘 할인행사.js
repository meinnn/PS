function solution(users, emoticons) {
    const discount = [10, 20, 30, 40];
    const perms = perm(emoticons.length);
    
    let subscribers = 0;
    let profit = 0;
    
    for (const perm of perms) {
        let subscribe = 0;
        let total = 0;
        
        for (const [ratio, max] of users) {
            let buy = 0;
            
            for (let i = 0; i < emoticons.length; i++) {
                const dc = discount[perm[i]];
                if (dc >= ratio) { 
                    const price = emoticons[i] * (100 - dc) / 100;
                    buy += price;
                }
                if (buy >= max) {
                    subscribe++;
                    break;
                }
                
                // break 없음 (가입 안 함)
                if (i === emoticons.length - 1) {
                    total += buy;
                }
            }
        }
        
        if (subscribe > subscribers) {
            subscribers = subscribe;
            profit = total;
        } else if (subscribe === subscribers && total > profit) {
            profit = total;
        }
    }
    
    return [subscribers, profit];
}

function perm(n) {
    const result = [];
    const select = Array(n);
    
    const make = (cnt) => {
        if (cnt === n) {
            result.push([...select]);
            return;
        }
        
        for (let i = 0; i < 4; i++) {
            select[cnt] = i;
            make(cnt + 1);
        }
    }
    
    make(0, 0);
    
    return result;
}