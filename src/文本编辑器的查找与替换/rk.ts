// 对主串中的n-m+1个子串求哈希值，然后模式串对哈希值逐个进行比较

const alphabetSize = 26;

const rk = (text, pattern) => {
  const m = pattern.length;
  const n = text.length;

  const h = [];
  const calculateHash = (s, i) => {
    if (i === 0) {
      let total = 0;
      for (let i = 0; i < m; i++) {
        total +=
          (s[i].charCodeAt(0) - "a".charCodeAt(0)) * Math.pow(alphabetSize, m - i + 1);
      }
      h[0] = total;
    } else {
      // h[i] = (h[i-1] - (s[i-1] - 'a')*26^m-1) * 26 + (s[i+m-1]-'a') * 26^0
      h[i] =
        (h[i - 1] -
          (s[i - 1].charCodeAt(0) - "a".charCodeAt(0)) * Math.pow(alphabetSize, m - 1)) *
          alphabetSize +
        s[i + m - 1].charCodeAt(0) -
        "a".charCodeAt(0);
    }
    return h[i];
  };

  const p_hash = calculateHash(pattern, 0);
  for (let i = 0; i <= n - m; i++) {
    const t_hash = calculateHash(text, i);
    if (p_hash === t_hash) {
      return i;
    }
  }
  return -1;
};

export function rk_TestFunction() {
  const a = "abca";
  const b = "bca";
  const result = rk(a, b);
  console.log(result);
  return result;
}
