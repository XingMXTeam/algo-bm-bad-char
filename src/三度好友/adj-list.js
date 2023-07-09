// 邻接表
class Node {
    constructor(vertex) {
        this.vertex = vertex;
        this.next = null;
    }
}
export function addEdge(source, destination) {
    let newNode = new Node(destination);
    newNode.next = adj[source];
    adj[source] = newNode;
}


// // 邻接矩阵
// let adj = [
//     [1, 2],    // Adjacency list for vertex 0
//     [0, 2, 3], // Adjacency list for vertex 1
//     [0, 1, 4], // Adjacency list for vertex 2
//     [1],       // Adjacency list for vertex 3
//     [2]        // Adjacency list for vertex 4
// ];
