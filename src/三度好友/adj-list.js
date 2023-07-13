// // 邻接表
// class Node {
//     constructor(vertex) {
//         this.vertex = vertex;
//         this.next = null;
//     }
// }
// export function addEdge(adj, source, destination) {
//     let newNode = new Node(destination);
//     newNode.next = adj[source];
//     adj[source] = newNode;
// }

class Graph {
    constructor(v) {
        this.v = v;
        this.adj = new Array(v);
        for (let i = 0; i < v; ++i) {
            this.adj[i] = [];
        }
    }

    /**
     *
     * @param s s是顶点
     * @param t
     */
    addEdge(s, t) {
        this.adj[s].push(t);
        this.adj[t].push(s);
    }
}

// // 邻接矩阵
// let adj = [
//     [1, 2],    // Adjacency list for vertex 0
//     [0, 2, 3], // Adjacency list for vertex 1
//     [0, 1, 4], // Adjacency list for vertex 2
//     [1],       // Adjacency list for vertex 3
//     [2]        // Adjacency list for vertex 4
// ];
