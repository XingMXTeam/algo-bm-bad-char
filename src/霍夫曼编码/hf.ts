const createNode = (char, frequency) => {
    return {
        char,
        frequency,
        left: null,
        right: null
    }
}

const buildHuffmanTree = (data) => {

    // 保存频率升序排列的节点数组
    const nodes = Object.entries(data).map(([char, value]) => {
        return createNode(char, data[char])
    })

    // 构建霍夫曼树
    while(nodes.length > 1) {
        // 升序排列
        nodes.sort((a,b) => a.frequency - b.frequency)
        const left = nodes.shift()
        const right = nodes.shift()
        const parent = createNode(null, left.frequency + right.frequency)
        parent.left = left;
        parent.right = right;
        nodes.push(parent)
    }

    // root节点
    return nodes[0]
}


const buildHuffmanTable = root => {
    const huffmanTable = {}

    // 遍历边: 前序遍历
    const  traverse = (node, code) => {
        if(node.char) { // 叶子节点
            console.log('node.char', node.char)
            huffmanTable[node.char] = code
        }
        else { // 非叶子节点
            traverse(node.left, code + '0')
            traverse(node.right, code + '1')
        }
    }
    traverse(root, '');
    console.log('hu', huffmanTable)
    return huffmanTable
}

// 获得霍夫曼的编码：树的路径
function huffmanEncoding(data) {
    const root = buildHuffmanTree(data)
    const huffmanTable = buildHuffmanTable(root)

    let encodedData  = ''
    for(let symbol in data) {
        encodedData += huffmanTable[symbol] + " "
    }
    return encodedData.trim()
}

export function hf_TestFunction() {
    const data = {
        'a': 450,
        'b': 350,
        'c': 90,
        'd': 60,
        'e': 30,
        'f': 20,
    };

    const encodedData = huffmanEncoding(data);
    console.log(encodedData);
    return null;
}
