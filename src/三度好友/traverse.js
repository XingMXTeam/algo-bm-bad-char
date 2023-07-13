import { addEdge } from "./adj-list";

/**
 * 广度优先
 * @param s
 * @param t
 */
function bfs(adj, s, t) {
  if (s === t) return;
  const visited = new Array(v).fill(false);
  visited[s] = true;
  const queue = [];
  queue.push(s);
  const prev = new Array(v).fill(-1);
  while (queue.length !== 0) {
    const w = queue.shift();
    for (let i = 0; i < adj[w].length; i++) {
      const q = adj[w][i];
      if (!visited[q]) {
        prev[q] = w;
        if (q === t) {
          print(prev, s, t);
          return;
        }
        visited[q] = true;
        queue.push(q);
      }
    }
  }
}

function print(prev, s, t) {
  if (prev[t] !== -1 && t !== s) {
    print(prev, s, prev[t]);
  }
  console.log(t + " ");
}

// 深度優先搜索
let found = false; // 全局变量或类成员变量

function dfs(adj, s, t) {
  found = false;
  const visited = new Array(v).fill(false);
  const prev = new Array(v).fill(-1);
  for (let i = 0; i < v; ++i) {
    prev[i] = -1;
  }
  recurDfs(s, t, visited, prev);
  print(prev, s, t);
}

function recurDfs(adj, w, t, visited, prev) {
  if (found === true) return;
  visited[w] = true;
  if (w === t) {
    found = true;
    return;
  }
  for (let i = 0; i < adj[w].length; ++i) {
    const q = adj[w][i];
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


export function graph_bfs_function() {
  // Example usage
  let v = 5; // Number of vertices

  let adj = new Array(v).fill(null);

// Add edges to the adjacency list using linked list
  addEdge(adj, 0, 1);
  addEdge(adj,0, 2);
  addEdge(adj,1, 2);
  addEdge(adj,1, 3);
  addEdge(adj,2, 4);

  let source = 0; // Source vertex
  let target = 4; // Target vertex

  bfs(adj, source, target, v);
  return true;
}

export function test_bfs_function() {
// Example usage
  let v = 5; // Number of vertices

  let adj = new Array(v).fill(null);

// Add edges to the adjacency list using linked list
  addEdge(adj, 0, 1);
  addEdge(adj,0, 2);
  addEdge(adj,1, 2);
  addEdge(adj,1, 3);
  addEdge(adj,2, 4);

  let source = 0; // Source vertex
  let target = 4; // Target vertex

  dfs(adj, source, target);
}