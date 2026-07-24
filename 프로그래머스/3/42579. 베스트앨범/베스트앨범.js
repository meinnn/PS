function solution(genres, plays) {
    const genreIdMap = new Map(); // 장르: 장르id
    const genreArray = Array.from(new Set(genres));
    const genreCnt = genreArray.length;
    
    for (let i = 0; i < genreCnt; i++) {
        genreIdMap.set(genreArray[i], i);
    }
    
    let totalPlayMap = new Map(); // 장르: 총재생수
    let songMap = new Map(); // 장르: [[노래 id, 재생수]] 
    
    for (let i = 0; i < plays.length; i++) {
        if (!totalPlayMap.has(genres[i])) {
            totalPlayMap.set(genres[i], 0);
            songMap.set(genres[i], []);
        }
        totalPlayMap.set(genres[i], totalPlayMap.get(genres[i]) + plays[i]);
        songMap.get(genres[i]).push([i, plays[i]]);
    }
    
    totalPlayMap = new Map([...totalPlayMap].sort((a, b) => b[1] - a[1])); // 총재생수 내림차순 정렬
    
    const album = [];
    
    for (const [key] of totalPlayMap) {
        const sortedSong = songMap.get(key).sort((a, b) => b[1] - a[1]); // 재생수 내림차순 정렬
        album.push(...sortedSong.slice(0, 2).map(song => song[0])); // 상위 2개만
    }
    
    return album;
}