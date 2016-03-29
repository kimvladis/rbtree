const Red = 1;
const Black = 0;

function newNode(c, v, l, r) {
  return {
    color: c,
    value: v,
    left: l,
    right: r,
  };
}

function value(node) {
  return node.value;
}

function color(node) {
  return node.color;
}

function left(node) {
  return node.left;
}

function right(node) {
  return node.right;
}

function isRed(node) {
  return node !== undefined && color(node) === Red;
}

function isBlack(node) {
  return node === undefined || color(node) === Black;
}

function createTree(v) {
  return newNode(Black, v);
}

function insert(node, val) {
  const fillBlack = (n) => newNode(Black, value(n), left(n), right(n));

  const balanceLeft = (mainNode, leftNode, rightNode) => {
    if (isBlack(mainNode)) {
      if (isRed(leftNode) && isRed(left(leftNode))) {
        if (isRed(rightNode)) {
          return newNode(Red, value(mainNode), fillBlack(leftNode), fillBlack(rightNode));
        }

        const x = value(mainNode);
        const y = value(leftNode);
        const z = value(left(leftNode));
        const a = left(left(leftNode));
        const b = right(left(leftNode));
        const c = right(leftNode);
        const d = rightNode;

        return newNode(Black, y, newNode(Red, z, a, b), newNode(Red, x, c, d));
      } else if (isRed(leftNode) && isRed(right(leftNode))) {
        if (isRed(rightNode)) {
          return newNode(Red, value(mainNode), fillBlack(leftNode), fillBlack(rightNode));
        }

        const x = value(mainNode);
        const y = value(right(leftNode));
        const z = value(leftNode);
        const a = left(leftNode);
        const b = left(right(leftNode));
        const c = right(right(leftNode));
        const d = rightNode;

        return newNode(Black, y, newNode(Red, z, a, b), newNode(Red, x, c, d));
      }
    }

    return newNode(color(mainNode), value(mainNode), leftNode, rightNode);
  };

  const balanceRight = (mainNode, leftNode, rightNode) => {
    if (isBlack(mainNode)) {
      if (isRed(rightNode) && isRed(right(rightNode))) {
        if (isRed(leftNode)) {
          return newNode(Red, value(mainNode), fillBlack(leftNode), fillBlack(rightNode));
        }

        const x = value(mainNode);
        const y = value(rightNode);
        const z = value(right(rightNode));
        const a = leftNode;
        const b = left(rightNode);
        const c = left(right(rightNode));
        const d = right(right(rightNode));

        return newNode(Black, y, newNode(Red, x, a, b), newNode(Red, z, c, d));
      } else if (isRed(rightNode) && isRed(left(rightNode))) {
        if (isRed(leftNode)) {
          return newNode(Red, value(mainNode), fillBlack(leftNode), fillBlack(rightNode));
        }

        const x = value(mainNode);
        const y = value(left(rightNode));
        const z = value(rightNode);
        const a = leftNode;
        const b = left(left(rightNode));
        const c = right(left(rightNode));
        const d = right(rightNode);

        return newNode(Black, y, newNode(Red, x, a, b), newNode(Red, z, c, d));
      }
    }

    return newNode(color(mainNode), value(mainNode), leftNode, rightNode);
  };

  const balanceAdd = (n) => {
    if (n === undefined) {
      return newNode(Red, val);
    } else if (val < value(n)) {
      return balanceLeft(n, balanceAdd(left(n)), right(n));
    } else if (val > value(n)) {
      return balanceRight(n, left(n), balanceAdd(right(n)));
    }

    return n;
  };

  return fillBlack(balanceAdd(node));
}

function treeToStr(root) {
  function traverse(r, indent, side) {
    if (r === undefined) {
      return '';
    }

    const col = color(root) === Red ? 'R' : 'B';

    return `${indent}${side}(${value(r)}, ${col})\n${traverse(left(r), `${indent}  `, 'L')}${traverse(right(r), `${indent}  `, 'R')}`;
  }

  return traverse(root, '', 'ROOT');
}

function depth(node) {
  if (node === undefined || node === null) return 0;
  return Math.max(1 + depth(left(node)), 1 + depth(right(node)));
}

export { insert, depth, createTree, treeToStr };
