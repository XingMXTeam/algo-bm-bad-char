const createTrieNode = (data) => {
  return {
    data,
    children: Array(26)
      .fill(null),
    isEndingChar: false,
  };
};

const createTrie = () => {
  const root = createTrieNode("/");
  const insert = (words: string) => {
    let p = root;
    Array.from(words).forEach((c: string) => {
      let index: number = c.charCodeAt(0) - "a".charCodeAt(0);
      // 创建新节点
      if (p.children[index] === null) {
        p.children[index] = createTrieNode(c);
      }
      // 指向新节点
      p = p.children[index];
    });
    // 标记为单词结束节点
    p.isEndingChar = true;
  };
  const find = (pattern: string) => {
    let p = root;
    Array.from(pattern).forEach((c: string) => {
      let index = c.charCodeAt(0) - "a".charCodeAt(0);
      if (p.children[index] === null) {
        return false; // not found
      }
      p = p.children[index]; // found
    });
    if (p.isEndingChar === false) return false; // 不能完全匹配
    return true; //找到单词。完全匹配
  };

  return {
    insert,
    find,
  };
};

export function trie_TestFunction() {
  const trie = createTrie();
  const { insert, find } = trie;
  insert("apple");
  insert("app");
  insert("application");
  insert("banana");
  insert("bat");
  insert("cat");
  const result = find("app");
  console.log(result);
  return result
}
