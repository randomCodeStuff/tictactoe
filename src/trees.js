class Node {
  constructor(value) {
    this.val = value;
    this.leftChild = null;
    this.rightChild = null;
  }
}

class Tree {
  constructor(rootValue) {
    this.root = new Node(rootValue);
  }

  postOrderPrint(currentNode) {
    if (currentNode !== null) {
      this.postOrderPrint(currentNode.leftChild);
      this.postOrderPrint(currentNode.rightChild);
      console.log(currentNode.val);
    }
  }
}

var tree = new Tree(6);
tree.insertLeft(12);

tree.postOrderPrint(tree.root);
