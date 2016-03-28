const RED = 1;
const BLACK = 0;

/**
 * Red Black node
 */
export default class RBNode {
  constructor(value) {
    this.value = value;
    this.color = RED;
    this.left = null;
    this.right = null;
    this.parent = null;
  }

  /**
   * Gets node's value
   *
   * @returns {*}
   */
  getValue() {
    return this.value;
  }

  /**
   * Sets node's parent
   *
   * @param parent
   */
  setParent(parent) {
    this.parent = parent;
  }

  /**
   * Gets parent of the node
   *
   * @returns {RBNode}
   */
  getParent() {
    return this.parent;
  }

  /**
   * Gets grandparent of the node
   *
   * @returns {null|RBNode}
   */
  getGrandparent() {
    if (this.parent !== null) {
      return this.parent.parent;
    }

    return null;
  }

  /**
   * Gets uncle of the node
   *
   * @returns {null|RBNode}
   */
  getUncle() {
    const grandparent = this.getGrandparent();
    if (grandparent === null) {
      return null;
    }
    if (this.parent === grandparent.left) {
      return grandparent.right;
    }

    return grandparent.left;
  }

  /**
   * Inserts child to the left
   *
   * @returns {RBNode}
   */
  insertLeft(value) {
    this.left = new RBNode(value);
    this.left.parent = this;
    this.left.fillRed();

    return this.left;
  }

  /**
   * Sets the left child
   *
   * @param node
   */
  setLeft(node) {
    this.left = node;
  }

  /**
   * Gets the left child
   *
   * @returns {RBNode|null}
   */
  getLeft() {
    return this.left;
  }

  /**
   * Inserts child to the right
   *
   * @returns {RBNode}
   */
  insertRight(value) {
    this.right = new RBNode(value);
    this.right.parent = this;
    this.right.fillRed();

    return this.right;
  }

  /**
   * Sets the right child
   *
   * @param {RBNode} node
   */
  setRight(node) {
    this.right = node;
  }

  /**
   * Gets the right child
   *
   * @returns {RBNode|null}
   */
  getRight() {
    return this.right;
  }

  /**
   * Fill node within red
   */
  fillRed() {
    this.color = RED;
  }

  /**
   * Checks if node is red
   *
   * @returns {boolean}
   */
  isRed() {
    return this.color === RED;
  }

  /**
   * Fill node within black
   */
  fillBlack() {
    this.color = BLACK;
  }

  /**
   * Checks if node is black
   *
   * @returns {boolean}
   */
  isBlack() {
    return this.color === BLACK;
  }

  /**
   * Search node by value
   *
   * @param value
   * @returns {boolean|RBNode}
   */
  search(value) {
    if (value === this.value) return this;
    if (value > this.value) {
      if (this.right === null) {
        return false;
      }

      return this.right.search(value);
    }

    if (this.left === null) {
      return false;
    }

    return this.left.search(value);
  }

  /**
   * Inserts value
   *
   * @param value
   * @returns {RBNode|boolean}
   */
  insert(value) {
    if (value === this.value) return false;
    if (value > this.value) {
      if (this.right === null) {
        return this.insertRight(value);
      }

      return this.right.insert(value);
    }

    if (this.left === null) {
      return this.insertLeft(value);
    }

    return this.left.insert(value);
  }

  /**
   * Checks if node is left parent's child
   *
   * @returns {boolean}
   */
  isLeft() {
    return this.getParent() !== null && this.getParent().getLeft() === this;
  }

  /**
   * Checks if node is right parent's child
   *
   * @returns {boolean}
   */
  isRight() {
    return this.getParent() !== null && this.getParent().getRight() === this;
  }

  /**
   * Text representation of node
   *
   * @returns {string}
   */
  toString() {
    return this.value.toString();
  }
}
