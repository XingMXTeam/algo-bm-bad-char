export class SkipList {
  constructor() {
    this.SKIPLIST_P = 0.5;
    this.MAX_LEVEL = 16;
    this.levelCount = 1;
    this.head = new Node();
  }

  find(value) {
    let p = this.head;
    for (let i = this.levelCount - 1; i >= 0; --i) {
      while (p.forwards[i] !== null && p.forwards[i].data < value) {
        p = p.forwards[i];
      }
    }

    if (p.forwards[0] !== null && p.forwards[0].data === value) {
      return p.forwards[0];
    } else {
      return null;
    }
  }

  insert(value) {
    const level = value === 5 ? 2: 1;
    const newNode = new Node();
    newNode.data = value;
    newNode.maxLevel = level;
    const update = new Array(level).fill(this.head);

    let p = this.head;
    for (let i = level - 1; i >= 0; --i) {
      while (p.forwards[i] && p.forwards[i].data < value) {
        p = p.forwards[i];
      }
      update[i] = p;
    }

    for (let i = 0; i < level; ++i) {
      newNode.forwards[i] = update[i].forwards[i];
      update[i].forwards[i] = newNode;
    }

    if (this.levelCount < level) this.levelCount = level;
  }

  delete(value) {
    const update = new Array(this.levelCount);
    let p = this.head;
    for (let i = this.levelCount - 1; i >= 0; --i) {
      while (p.forwards[i] !== null && p.forwards[i].data < value) {
        p = p.forwards[i];
      }
      update[i] = p;
    }

    if (p.forwards[0] !== null && p.forwards[0].data === value) {
      for (let i = this.levelCount - 1; i >= 0; --i) {
        if (
          update[i].forwards[i] !== null &&
          update[i].forwards[i].data === value
        ) {
          update[i].forwards[i] = update[i].forwards[i].forwards[i];
        }
      }
    }

    while (
      this.levelCount > 1 &&
      this.head.forwards[this.levelCount] === null
    ) {
      this.levelCount--;
    }
  }

  randomLevel() {
    let level = 1;

    while (Math.random() < this.SKIPLIST_P && level < this.MAX_LEVEL) {
      level += 1;
    }
    return level;
  }

  printAll() {
    let p = this.head;
    while (p.forwards && p.forwards[0] !== null) {
      console.log(p.forwards[0]);
      p = p.forwards[0];
    }
    console.log();
  }
}

class Node {
  constructor() {
    this.data = -1;
    this.forwards = new Array(this.MAX_LEVEL);
    this.maxLevel = 0;
  }

  toString() {
    return `{ data: ${this.data}, levels: ${this.maxLevel} }`;
  }
}
