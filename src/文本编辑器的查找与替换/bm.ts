const SIZE = 256;

// 保存模式串的字符下标
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
function bm_bc(a: string, b: string) {
  // 用于存储模式串中每个字符对应的下标
  const bc: number[] = new Array(SIZE).fill(-1);
  generateBC(bc, b); //生成256位的ascii码数组来存储字符的下标，避免通过遍历来查找
  let n = a.length;//主串的长度
  let m = b.length;//模式串的长度
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
    // xi: a[i+j] 这个坏字符在模式串的位置
    // si: j
    i = i + (j - bc[a[i + j].charCodeAt(0)]);
  }
  return -1; // 没找到匹配的
}


// 通过以上三个图， 我们要计算右移的位数，需要知道
// 好后缀字符串{u} 和 另一个字串{u*} 匹配的下标，也就是x
// 我们构建一个数组suffix[子串的长度] = x
/**
 * @param b 模式串
 * @param suffix
 * @param prefix
 * @param m
 */
function generateSuffix(b: string, suffix: number[], prefix: boolean[], m) {
  for(let i = 0; i < m - 1; i++) { // 遍历b
    let j = i;
    let k = 0; // 公共后缀子串的长度
    // 头尾元素比较，如果相等，则头元素往前移动，继续比较两位，三位长度
    while(j >= 0 && b[j] == b[m - 1 - k]) {
      --j;
      ++k;
      suffix[k] = j + 1;
    }
    if(j === -1) {
      prefix[k] = true; // 是最长子串。 因为我们要找的就是最长子串
    }
  }
}

function moveByGS(j: number, m: number, suffix: number[], prefix: boolean[]) {
  let k = m - 1 - j;// 好后缀的长度
  // 1、完全匹配
  if(suffix[k] !== -1) {// 表示存在最长公共后缀子串，先找bc, 再找c
    return j - suffix[k] + 1;
  }
  // 2、部分匹配
  for(let r = j + 2; r <= m -1; ++r) {
    if(prefix[m-1-r+1]) { // 这个是我们的最长公共子串
      return r
    }
  }
  // 3、不匹配
  return m;
}

/**
 * @param a 主串
 * @param b 模式串
 */
function bm(a: string, b: string) {
  // 用于存储模式串中每个字符对应的下标
  const bc: number[] = new Array(SIZE).fill(-1);
  generateBC(bc, b); //生成256位的ascii码数组来存储字符的下标，避免通过遍历来查找
  let suffix = new Array(b.length).fill(-1);
  let prefix = new Array(b.length).fill(false);
  let n = a.length;
  let m = b.length;
  generateSuffix(b, suffix, prefix, m);
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
    let x = j - bc[a[i + j].charCodeAt(0)]; // 坏字符移动的长度
    let y = 0;
    if(j < m - 1) {// 有好后缀
      y = moveByGS(j, m, suffix, prefix); // 好字符移动的长度
    }
    i = i + Math.max(x, y);
  }
  return -1; // 没找到匹配的
}


export function BMTestFunction() {
  const a = "abcacabdc";
  const b = "abd";
  const result = bm(a, b);
  console.log(result);
  return result;
}
export function BM_BC_TestFunction() {
  const a = "abcacabdc";
  const b = "abd";
  const result = bm_bc(a, b);
  console.log(result);
  return result;
}