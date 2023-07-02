class SkipListNode {
  constructor(value, level) {
    this.value = value;
    this.next = new Array(level).fill(null);
  }
}

class SkipList {
  constructor() {
    this.head = new SkipListNode(null, 32);
    this.maxLevel = 0;
  }

  randomLevel() {
    let level = 1;
    while (Math.random() < 0.5 && level < this.head.next.length) {
      level++;
    }
    return level;
  }

  insert(value) {
    const newNodeLevel = this.randomLevel();
    const newNode = new SkipListNode(value, newNodeLevel);

    let currentNode = this.head;
    const update = new Array(newNodeLevel).fill(null);

    for (let i = this.maxLevel - 1; i >= 0; i--) {
      while (currentNode.next[i] && currentNode.next[i].value < value) {
        currentNode = currentNode.next[i];
      }
      update[i] = currentNode;
    }

    for (let i = 0; i < newNodeLevel; i++) {
      newNode.next[i] = update[i].next[i];
      update[i].next[i] = newNode;
    }

    if (newNodeLevel > this.maxLevel) {
      this.maxLevel = newNodeLevel;
    }
  }

  search(value) {
    let currentNode = this.head;
    for (let i = this.maxLevel - 1; i >= 0; i--) {
      while (currentNode.next[i] && currentNode.next[i].value < value) {
        currentNode = currentNode.next[i];
      }
    }
    currentNode = currentNode.next[0];

    if (currentNode && currentNode.value === value) {
      return currentNode;
    }
    return null;
  }
}

function createAdjacencyList(relationships) {
  const adjacencyList = {};

  for (const node in relationships) {
    if (relationships.hasOwnProperty(node)) {
      const skipList = new SkipList();
      const neighbors = relationships[node];

      for (const neighbor of neighbors) {
        skipList.insert(neighbor);
      }

      adjacencyList[node] = skipList;
    }
  }

  return adjacencyList;
}

const relationships = {
  1: [2],
  2: [1, 3, 4],
  3: [2, 5],
  4: [1, 2, 5],
  5: [2, 3, 4],
};

const adjacencyList = createAdjacencyList(relationships);
console.log(adjacencyList);
