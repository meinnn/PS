function solution(numbers) {
    const answer = [];
    
    for (const num of numbers) {
        let binary = num.toString(2);
        let k = 0;
        while (2 ** k - 1 < binary.length) k++;
        
        let zeros = '';
        for (let i=0; i < (2 ** k - 1) - binary.length; i++) {
            zeros += '0';
        }
        
        answer.push(isBinaryTree(zeros + binary) ? 1 : 0);
    }
    
    return answer;
}

function isBinaryTree(str) {
    if (str.length === 1) return true;
    
    const root = Math.floor(str.length / 2);
    const left = str.slice(0, root);
    const right = str.slice(root + 1);
    
    if (str[root] === '0') {
        if (left.includes('1') || right.includes('1')) return false;
        else return true;
    }
    
    return isBinaryTree(left) && isBinaryTree(right);
}