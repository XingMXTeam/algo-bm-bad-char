import { addEdge } from "./adj-list";

/**
 * 广度优先
 * @param s
 * @param t
 */
function bfs(s, t) {
  if (s === t) return;

  // 判断是否已访问过
  let visited = new Array(v).fill(false);
  visited[s] = true;

  // 因为是广度搜索 必须有队列
  let queue = [];
  queue.push(s);

  // 记录搜索路径
  let prev = new Array(v).fill(-1);

  while (queue.length !== 0) {
    let w = queue.shift();

    let current = adj[w];
    while (current !== null) {
      // 邻接矩阵的遍历
      // for (let i = 0; i < adj[w].length; i++) {
      //   let q = adj[w][i];

      let q = current.vertex;
      if (!visited[q]) {
        print(prev, s, t);
        return;
      }

      visited[q] = true;
      queue.push(q);

      current = current.next;
    }
  }
}

// 深度優先搜索
let found = false;
function dfs(s, t) {
  found = false;
  const visited = new Array(v).fill(false);
  const prev = new Array(v).fill(-1);
  recurDfs(s, t, visited, prev);
  print(prev, s, t);
}

function recurDfs(w, t, visited, prev) {
  if (found) return;
  visited[w] = true;
  if (w === t) {
    found = true;
    return;
  }
  let current = adj[w];
  while (current !== null) {
    let q = current.vertex;
    if (!visited[q]) {
      prev[q] = w;
      recurDfs(q, t, visited, prev);
    }
  }
}

// Helper function to print the path
function print(prev, s, t) {
  // Implement your own logic to print the path
  // based on the 'prev' array and the given 's' and 't'
}

// Example usage
let v = 5; // Number of vertices

let adj = new Array(v).fill(null);

// Add edges to the adjacency list using linked list
addEdge(0, 1);
addEdge(0, 2);
addEdge(1, 2);
addEdge(1, 3);
addEdge(2, 4);

let source = 0; // Source vertex
let target = 4; // Target vertex

bfs(source, target);
