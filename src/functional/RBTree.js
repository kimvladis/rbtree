const red = 1;
const black = 0;

/**
 * Description of Node object
 */
class Node {
  constructor(c, v, l, r) {
    this.color = c;
    this.value = v;
    this.left = l;
    this.right = r;
  }
}

/**
 * Creates new node
 *
 * @param {number} c color
 * @param {number} v value
 * @param {Object} l left child
 * @param {Object} r right child
 * @returns {Node}
 */
function newNode(c, v, l, r) {
  return {
    value: v,
    color: c,
    left: l,
    right: r,
  };
}

/**
 * Gets node's value
 *
 * @param {Node} n node
 * @returns {number}
 */
function value(n) {
  return n.value;
}

/**
 * Gets node'color
 *
 * @param {Node} n node
 * @returns {number}
 */
function color(n) {
  return n.color;
}

/**
 * Gets the left child of the node
 *
 * @param {Node} n node
 * @returns {Node}
 */
function left(n) {
  return n.left;
}

/**
 * Gets the right child of the node
 *
 * @param {Node} n node
 * @returns {Node}
 */
function right(n) {
  return n.right;
}

/**
 * Checks if node is red
 *
 * @param {Node} n node
 * @returns {boolean}
 */
function isRed(n) {
  return n !== undefined && color(n) === red;
}

/**
 * Checks if node is black
 *
 * @param {Node} n node
 * @returns {boolean}
 */
function isBlack(n) {
  return n === undefined || color(n) === black;
}

/**
 * Creates new tree
 *
 * @param {number} v value
 * @returns {Node}
 */
function createTree(v) {
  return newNode(black, v, undefined, undefined);
}

/**
 * Inserts new value with balancing to the given tree
 *
 * @param {Node} t tree
 * @param {number} v value
 * @returns {Node}
 */
function insert(t, v) {
  const fillBlack = (n) => newNode(black, value(n), left(n), right(n));

  const balanceLeft = (mainNode, leftNode, rightNode) => {
    if (isBlack(mainNode)) {
      if (isRed(leftNode) && isRed(left(leftNode))) {
        if (isRed(rightNode)) {
          return newNode(red, value(mainNode), fillBlack(leftNode), fillBlack(rightNode));
        }

        const x = value(mainNode);
        const y = value(leftNode);
        const z = value(left(leftNode));
        const a = left(left(leftNode));
        const b = right(left(leftNode));
        const c = right(leftNode);
        const d = rightNode;

        return newNode(black, y, newNode(red, z, a, b), newNode(red, x, c, d));
      } else if (isRed(leftNode) && isRed(right(leftNode))) {
        if (isRed(rightNode)) {
          return newNode(red, value(mainNode), fillBlack(leftNode), fillBlack(rightNode));
        }

        const x = value(mainNode);
        const y = value(right(leftNode));
        const z = value(leftNode);
        const a = left(leftNode);
        const b = left(right(leftNode));
        const c = right(right(leftNode));
        const d = rightNode;

        return newNode(black, y, newNode(red, z, a, b), newNode(red, x, c, d));
      }
    }

    return newNode(color(mainNode), value(mainNode), leftNode, rightNode);
  };

  const balanceRight = (mainNode, leftNode, rightNode) => {
    if (isBlack(mainNode)) {
      if (isRed(rightNode) && isRed(right(rightNode))) {
        if (isRed(leftNode)) {
          return newNode(red, value(mainNode), fillBlack(leftNode), fillBlack(rightNode));
        }

        const x = value(mainNode);
        const y = value(rightNode);
        const z = value(right(rightNode));
        const a = leftNode;
        const b = left(rightNode);
        const c = left(right(rightNode));
        const d = right(right(rightNode));

        return newNode(black, y, newNode(red, x, a, b), newNode(red, z, c, d));
      } else if (isRed(rightNode) && isRed(left(rightNode))) {
        if (isRed(leftNode)) {
          return newNode(red, value(mainNode), fillBlack(leftNode), fillBlack(rightNode));
        }

        const x = value(mainNode);
        const y = value(left(rightNode));
        const z = value(rightNode);
        const a = leftNode;
        const b = left(left(rightNode));
        const c = right(left(rightNode));
        const d = right(rightNode);

        return newNode(black, y, newNode(red, x, a, b), newNode(red, z, c, d));
      }
    }

    return newNode(color(mainNode), value(mainNode), leftNode, rightNode);
  };

  const balanceAdd = (n) => {
    if (n === undefined) {
      return newNode(red, v);
    } else if (v < value(n)) {
      return balanceLeft(n, balanceAdd(left(n)), right(n));
    } else if (v > value(n)) {
      return balanceRight(n, left(n), balanceAdd(right(n)));
    }

    return n;
  };

  return fillBlack(balanceAdd(t));
}

/**
 * Text representation of tree
 *
 * @param {Node} t tree
 */
function treeToStr(t) {
  const traverse = (r, i, s) => {
    if (r === undefined) {
      return '';
    }

    const col = color(t) === red ? 'R' : 'B';

    return `${i}${s}(${value(r)}, ${col})\n` +
           `${traverse(left(r), `${i}  `, 'L')}${traverse(right(r), `${i}  `, 'R')}`;
  };

  return traverse(t, '', 'ROOT');
}

/**
 * Gets tree's max height
 *
 * @param {Node} t tree
 * @returns {number}
 */
function height(t) {
  if (t === undefined || t === null) return 0;
  return Math.max(1 + height(left(t)), 1 + height(right(t)));
}

export { insert, height, createTree, treeToStr, value };
