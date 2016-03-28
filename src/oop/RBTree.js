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
    if (this.root === null) {
      this.root = new RBNode(value);
      this.root.fillBlack();
    } else {
      const newNode = this.root.insert(value);
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
    if (node === this.root) {
      node.fillBlack();
      return true;
    }
    if (node && node.getParent() !== null && node.getParent().isRed()) {
      if (node.getParent().isLeft()) {
        const y = node.getUncle();
        if (y !== null && y.isRed()) {
          node.getParent().fillBlack();
          y.fillBlack();
          node.getGrandparent().fillRed();

          return this.balance(node.getGrandparent());
        }

        let tmp = node;
        if (tmp.isRight()) {
          tmp = tmp.getParent();
          this.rotateLeft(tmp);
        }

        tmp.getParent().fillBlack();
        const gp = tmp.getGrandparent();
        if (gp !== null) {
          gp.fillRed();
          this.rotateRight(gp);

          return this.balance(gp);
        }
      } else {
        const y = node.getUncle();
        if (y !== null && y.isRed()) {
          node.getParent().fillBlack();
          y.fillBlack();
          node.getGrandparent().fillRed();

          return this.balance(node.getGrandparent());
        }

        let tmp = node;
        if (tmp.isLeft()) {
          tmp = tmp.getParent();
          this.rotateRight(tmp);
        }

        tmp.getParent().fillBlack();
        const gp = tmp.getGrandparent();
        if (gp !== null) {
          gp.fillRed();
          this.rotateLeft(gp);
          return this.balance(gp);
        }
      }
    }

    return false;
  }

  /**
   * Rotate left
   *
   * @param {RBNode} node
   */
  rotateLeft(node) {
    const y = node.getRight();

    node.setRight(y.getLeft());
    if (y.getLeft() !== null) y.getLeft().setParent(node);

    if (y !== null) y.setParent(node.getParent());
    if (node.getParent()) {
      if (node === node.getParent().getLeft()) {
        node.getParent().setLeft(y);
      } else {
        node.getParent().setRight(y);
      }
    } else {
      this.root = y;
    }

    y.setLeft(node);
    if (node !== null) node.setParent(y);
  }

  /**
   * Rotate right
   *
   * @param {RBNode} node
   */
  rotateRight(node) {
    const y = node.getLeft();

    node.setLeft(y.getRight());
    if (y.getRight() !== null) y.getRight().setParent(node);

    if (y !== null) y.setParent(node.getParent());
    if (node.getParent()) {
      if (node === node.getParent().getRight()) {
        node.getParent().setRight(y);
      } else {
        node.getParent().setLeft(y);
      }
    } else {
      this.root = y;
    }

    y.setRight(node);
    if (node !== null) node.setParent(y);
  }

  /**
   * Text representation of tree
   *
   * @returns {string}
   */
  toString() {
    const lines = [];

    if (root !== null) {
      const indentText = '  ';
      const stack = [[this.root, 0, 'ROOT']];

      while (stack.length > 0) {
        const current = stack.pop();
        const node = current[0];
        const indent = current[1];
        let line = '';

        for (let i = 0; i < indent; i++) {
          line += indentText;
        }

        line += `${current[2]}(${node.toString()})`;
        lines.push(line);

        if (node.getRight() !== null) stack.push([node.getRight(), indent + 1, 'R']);
        if (node.getLeft() !== null) stack.push([node.getLeft(), indent + 1, 'L']);
      }
    }

    return lines.join('\n');
  }
}
