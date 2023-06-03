
function genNexts(b) {
    let m = b.length;
    let next = new Array(m);
    next[0] = -1;
    let k = -1; // 好前缀的前缀子串
    for(let i =1; i< m;i++) {
        // case 2: 循环找
        while(k !== -1 && b[k+1] != b[i]) {
            k = next[k]
        }
        // case 1
        if(b[k+1] === b[i]) {
            ++k;
        }
        // 记录下来
        next[i] = k;
    }
    return next;    
}

function kmp(a, b) {
    let n = a.length; 
    let m = b.length; // 模式串长度
    let next = genNexts(b, m); // 只跟模式串有关
    let j = 0;// 模式串下标
    for(let i=0; i<n; i++) {
        while(j > 0 && a[i] !== b[j]) { // 找到坏字符
            j = next[j-1] + 1; // j 更新为k。 
        }
        if(a[i] === b[j]) { // 相等的情况
            ++j;// 移动模式串下标
        }  
        if(j == m) { // 找到匹配字符，返回i的位置
            return  i - m + 1;
        }
    }
    return -1; //没有找到匹配
}

export function kmp_TestFunction() {
  const a = "abcacabdc";
  const b = "abd";
  const result = kmp(a, b);
  console.log(result);
  return result;
}