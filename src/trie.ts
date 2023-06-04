const createTrieNode = () => {
    return {
        children:new Map(),
        isEndOfWord:false
    }
}

const insertWord = (node, word) => {
    // 表示所有的字符插入结束
    if(word.length === 0) {
        return { ...node, isEndOfWord: true}
    }
    const char = word[0];
    const rest = word.slice(1);
    // 创建一个新节点
    const childNode = node.children.get(char) || createTrieNode();
    // 插入节点，并返回根节点
    const updatedChildNode  = insertWord(childNode, rest);
    const updatedChildren = new Map(node.children).set(char, updatedChildNode);
    return {...node, children: updatedChildren}   
}


const searchWords = (node, prefix, result) => {
    if(node.isEndOfWord) {
        result.push(prefix)
    }
    // value, key
    node.children.forEach((childNode, char) => {
        searchWords(childNode, prefix + char, result)
    })
    return result;
}

const createTrie= () => {
    
    let root= createTrieNode();
    const insert = (word) => {
        root = insertWord(root, word);
    }
    const search = (prefix) => {
        let current = root;
        const result = [];
        for(let i = 0; i<prefix.length;i++) {
            const char = prefix[i];
            const node = current.children.get(char);
            if(!node) {
                return result;
            }
            current = node;
        }
        return searchWords(current, prefix, result)
    }
    
    return {
        insert, 
        search
    }
}

export function trie_test_function() {
    const trie = createTrie();
    const { insert ,search } = trie;
    inerst('apple')
    insert('app')
    insert('application')
    insert('banana')
    insert('bat')
    insert('cat')
    const result = search('app');
    console.log(result)
}