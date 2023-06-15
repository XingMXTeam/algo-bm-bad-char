const createNode = (symbol, frequency) => {
    return {
        symbol,
        frequency,
        left: null,
        right: null
    }
}

const buildHuffmanTree = (data) => {

    // 创建叶子节点
    const nodes = Object.entries(data).map(([symbol, value]) => {

        return createNode(symbol, data[symbol])
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
        console.log('nodes', nodes)
    }

    // root节点
    return nodes[0]

}


const buildHuffmanTable = root => {
    const huffmanTable = {}
    const  tranverse = (node, code) => {
        if(node.symbol) { // 叶子节点
            huffmanTable[node.symbol] = code
        }
        else { // 非叶子节点
            tranverse(node.left, code +'0')
            tranverse(node.right, code + '1')
        }
    }
    tranverse(root, '')
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
        'A': 5,
        'B': 9,
        'C': 12,
        'D': 13,
        'E': 16,
        'F': 45,
    };

    const encodedData = huffmanEncoding(data);
    console.log(encodedData);
    return true;
}
