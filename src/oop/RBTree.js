import RBNode from './RBNode.js';

/**
 * Red Black Tree data structure
 */
export default class RBTree {
  constructor() {
    this.root = null;
  }

  /**
   * Insert value to the tree
   *
   * @param value
   */
  insert(value) {
    if (this.root == null) {
      this.root = new RBNode(value);
      this.root.fillBlack();
    } else {
      var newNode = this.root.insert(value);
      this.balance(newNode);
    }

  }

  /**
   * Balance tree
   *
   * @param {RBNode} node
   * @returns {boolean}
   */
  balance(node) {
    if (node == this.root) {
      node.fillBlack();
      return true;
    }
    if (node && node.getParent() != null && node.getParent().isRed()) {
      if (node.getParent().isLeft()) {
        let y = node.getUncle();
        if (y != null && y.isRed()) {
          node.getParent().fillBlack();
          y.fillBlack();
          node.getGrandparent().fillRed();

          this.balance(node.getGrandparent());
        } else {
          if (node.isRight()) {
            node = node.getParent();
            this.rotateLeft(node);
          }

          node.getParent().fillBlack();
          let gp = node.getGrandparent();
          if (gp != null) {
            gp.fillRed();
            this.rotateRight(gp);
            this.balance(gp);
          }
        }
      } else {
        let y = node.getUncle();
        if (y != null && y.isRed()) {
          node.getParent().fillBlack();
          y.fillBlack();
          node.getGrandparent().fillRed();

          this.balance(node.getGrandparent());
        } else {
          if (node.isLeft()) {
            node = node.getParent();
            this.rotateRight(node);
          }

          node.getParent().fillBlack();
          let gp = node.getGrandparent();
          if (gp != null) {
            gp.fillRed();
            this.rotateLeft(gp);
            this.balance(gp);
          }
        }
      }
    }
  }

  /**
   * Rotate left
   *
   * @param {RBNode} node
   */
  rotateLeft(node) {
    var y = node.getRight();

    node.setRight(y.getLeft());
    if (y.getLeft() != null) y.getLeft().setParent(node);

    if (y != null) y.setParent(node.getParent());
    if (node.getParent()) {
      if (node == node.getParent().getLeft()) {
        node.getParent().setLeft(y);
      } else {
        node.getParent().setRight(y);
      }
    } else {
      this.root = y;
    }

    y.setLeft(node);
    if (node != null) node.setParent(y);
  }

  /**
   * Rotate right
   *
   * @param {RBNode} node
   */
  rotateRight(node) {
    var y = node.getLeft();

    node.setLeft(y.getRight());
    if (y.getRight() != null) y.getRight().setParent(node);

    if (y != null) y.setParent(node.getParent());
    if (node.getParent()) {
      if (node == node.getParent().getRight())
        node.getParent().setRight(y);
      else
        node.getParent().setLeft(y);
    } else {
      this.root = y;
    }

    y.setRight(node);
    if (node != null) node.setParent(y);
  }

  /**
   * Text representation of tree
   *
   * @returns {string}
   */
  toString() {
    var lines = [];

    if (root != null) {
      var indentText = "  ";
      var stack = [[this.root, 0, "ROOT"]];

      while (stack.length > 0) {
        var current = stack.pop();
        var node = current[0];
        var indent = current[1];
        var line = "";

        for (var i = 0; i < indent; i++) {
          line += indentText;
        }

        let col = node.isRed() ? 'R' : 'B';
        line += current[2] + "(" + node.toString() + ', ' + col + ")";
        lines.push(line);

        if (node.getRight() != null) stack.push([node.getRight(), indent + 1, "R"]);
        if (node.getLeft() != null) stack.push([node.getLeft(), indent + 1, "L"]);
      }
    }

    return lines.join("\n");
  }
}
