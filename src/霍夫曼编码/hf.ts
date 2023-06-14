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
    const nodes = data.map((symbol) => createNode(symbol, data[symbol]))

    // 构建霍夫曼树
    while(nodes.length > 1) {
        // 升序排列
        nodes.sort((a,b) => a.frequency - b.frequency)
        const left = nodes.shift()
        const right = nodes.shift()
        const parent = createNode(null, left.frequency + right.frequency)
        parent.left = left;
        parent.right = right
    }

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