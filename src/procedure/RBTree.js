function RBNode(v) {
  this.value = v;
  this.left = null;
  this.right = null;
  this.parent = null;
  this.color = 0;
}

RBNode.prototype.toString = () => this.value.toString();

function value(n) {
  if (n !== null) {
    return n.value;
  }

  return null;
}

function setParent(n, p) {
  if (n !== null) {
    n.parent = p;
  }

  return n;
}

function setLeft(n, l) {
  if (n !== null) {
    n.left = l;
  }

  return n;
}

function setRight(n, r) {
  if (n !== null) {
    n.right = r;
  }

  return n;
}

function isRed(n) {
  return n !== null && n.color === 1;
}

function fillRed(n) {
  if (n !== null) {
    n.color = 1;
  }

  return n;
}

function isBlack(n) {
  return n === null || n.color === 0;
}

function fillBlack(n) {
  if (n !== null) {
    n.color = 0;
  }

  return n;
}

function parent(n) {
  if (n !== null) {
    return n.parent;
  }

  return null;
}

function left(n) {
  if (n !== null) {
    return n.left;
  }

  return null;
}

function right(n) {
  if (n !== null) {
    return n.right;
  }

  return null;
}

function grandparent(node) {
  return parent(parent(node));
}

function isLeft(node) {
  return left(parent(node)) === node;
}

function isRight(node) {
  return right(parent(node)) === node;
}

function uncle(node) {
  if (isLeft(parent(node))) {
    return right(grandparent(node));
  }

  return left(grandparent(node));
}

function _insert(n, v) {
  const newNode = new RBNode(v);

  return fillRed(setParent(newNode, n));
}

function insertLeft(n, v) {
  return left(setLeft(n, _insert(n, v)));
}

function insertRight(n, v) {
  return right(setRight(n, _insert(n, v)));
}

function search(n, v, c) {
  if (n === null) return null;

  if (v === value(n)) return n;

  if (v > value(n)) {
    if (c === true && right(n) === null) {
      return n;
    }

    return search(right(n), v, c);
  }

  if (c === true && left(n) === null) {
    return n;
  }

  return search(left(n), v, c);
}

function rotateLeft(n, r) {
  const _tmp = right(n);
  setRight(n, left(_tmp));
  setParent(left(_tmp), n);
  setParent(_tmp, parent(n));

  if (parent(n)) {
    if (isLeft(n)) {
      setLeft(parent(n), _tmp);
    } else {
      setRight(parent(n), _tmp);
    }
  } else {
    r = _tmp;
  }

  setLeft(_tmp, n);
  setParent(n, _tmp);

  return r;
}

function rotateRight(n, r) {
  const _tmp = left(n);
  setLeft(n, right(_tmp));
  setParent(right(_tmp), n);
  setParent(_tmp, parent(n));

  if (parent(n)) {
    if (isRight(n)) {
      setRight(parent(n), _tmp);
    } else {
      setLeft(parent(n), _tmp);
    }
  } else {
    r = _tmp;
  }

  setRight(_tmp, n);
  setParent(n, _tmp);

  return r;
}

function balance(n, r) {
  if (n === r) {
    fillBlack(n);
    return r;
  }

  if (isRed(parent(n))) {
    if (isRed(uncle(n))) {
      fillBlack(parent(n));
      fillBlack(uncle(n));
      fillRed(grandparent(n));

      return balance(grandparent(n), r);
    }

    if (isLeft(parent(n))) {
      if (isRight(n)) {
        n = parent(n);
        r = rotateLeft(n, r);
      }

      fillBlack(parent(n));

      const _gp = grandparent(n);
      fillRed(_gp);
      r = rotateRight(_gp, r);

      return balance(_gp, r);
    }

    if (isLeft(n)) {
      n = parent(n);
      r = rotateRight(n, r);
    }

    fillBlack(parent(n));

    const _gp = grandparent(n);
    fillRed(_gp);
    r = rotateLeft(_gp, r);

    return balance(_gp, r);
  }

  return r;
}

function insert(n, v) {
  const closestNode = search(n, v, true);

  if (value(closestNode) === v) {
    return n;
  } else if (value(closestNode) < v) {
    n = balance(insertRight(closestNode, v), n);
  } else {
    n = balance(insertLeft(closestNode, v), n);
  }

  return n;
}

function treeToStr(r) {
  const lines = [];

  if (r !== null) {
    const indentText = '  ';
    const stack = [[r, 0, 'ROOT']];

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

      if (right(node) !== null) stack.push([right(node), indent + 1, 'R']);
      if (left(node) !== null) stack.push([left(node), indent + 1, 'L']);
    }
  }

  return lines.join('\n');
}

function depth(node) {
  if (node === null) return 0;
  return Math.max(1 + depth(left(node)), 1 + depth(right(node)));
}

function level(node) {
  if (node === null) return 0;
  return 1 + level(parent(node));
}

export { insert, depth, level, RBNode, treeToStr };
