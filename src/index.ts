const SIZE = 256;

function generateBC(bc: Array<number>, b: string) {
  for (let i = 0; i < b.length; i++) {
    const ascii = b[i].charCodeAt(0); // 转成b[i]的ASCII值
    bc[ascii] = i;
  }
}

/**
 * 坏字符匹配算法实现
 * @param a 主串
 * @param b 模式串
 */
function bm(a: string, b: string) {
  // 用于存储模式串中每个字符对应的下标
  const bc: number[] = new Array(SIZE).fill(-1);
  generateBC(bc, b); //生成256位的ascii码数组来存储字符的下标，避免通过遍历来查找
  let n = a.length;
  let m = b.length;
  // 表示主串和模式串上下对齐的第一个字符
  let i = 0;
  while (i <= n - m) {
    // 当第一个字符比主串和模式串的长度差还小，表示不用再向后移动
    let j;
    // 模式串从后往前匹配
    for (j = m - 1; j >= 0; j--) {
      // 不匹配。 下标j是坏字符在模式串的位置
      if (a[i + j] !== b[j]) {
        break;
      }
    }
    // 匹配成功。返回模式串和主串第一个匹配的位置
    if (j <= 0) {
      return i;
    }
    // 模式串往后移动：根据坏字符规则, si - xi
    // si: a[i+j] 这个坏字符在模式串的位置
    // xi: j
    i = i + (j - bc[a[i + j].charCodeAt(0)]);
  }
  return -1; // 没找到匹配的
}

export function TestFunction() {
  const a = "abcacabdc";
  const b = "abd";
  const result = bm(a, b);
  console.log(result);
  return result;
}
