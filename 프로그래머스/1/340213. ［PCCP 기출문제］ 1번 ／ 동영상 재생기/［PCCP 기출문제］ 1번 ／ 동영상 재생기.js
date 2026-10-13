function solution(video_len, pos, op_start, op_end, commands) {
    const convertedVideoLen = convertToSec(video_len);
    const convertedOpStart = convertToSec(op_start);
    const convertedOpEnd = convertToSec(op_end);
    let cur = convertToSec(pos);
    
    for (const command of commands) {
        // 자동 오프닝 건너뛰기
        if (convertedOpStart <= cur && cur <= convertedOpEnd) {
            cur = convertedOpEnd;
        }
        
        if (command === "prev") {
            cur = Math.max(cur - 10, 0);        
        } else if (command === "next") {
            cur = Math.min(cur + 10, convertedVideoLen);
        }
    }
    
    // 자동 오프닝 건너뛰기
    if (convertedOpStart <= cur && cur <= convertedOpEnd) {
        cur = convertedOpEnd;
    }
    
    const min = Math.floor(cur / 60).toString().padStart(2, "0");
    const sec = (cur % 60).toString().padStart(2, "0");
    
    return min + ":" + sec;
}

function convertToSec(str) {
    const [min, sec] = str.split(':').map(Number);
    return min * 60 + sec;
}