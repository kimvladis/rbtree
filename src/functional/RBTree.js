function RBNode(value) {
  this.value = value;
  this.left = null;
  this.right = null;
  this.parent = null;
  this.color = 0;
}

RBNode.prototype.toString = function () {
  return this.value.toString();
};

function value(node) {
  if (node != null)
    return node.value;

  return null;
}

function setParent(node, parent) {
  if (node != null)
    node.parent = parent;

  return node;
}

function setLeft(node, leftNode) {
  if (node != null)
    node.left = leftNode;

  return node;
}

function setRight(node, rightNode) {
  if (node != null)
    node.right = rightNode;

  return node;
}

function _insert(node, value) {
  let newNode = new RBNode(value);

  return fillRed(setParent(newNode, node));
}

function insertLeft(node, value) {
  return left(setLeft(node, _insert(node, value)));
}

function insertRight(node, value) {
  return right(setRight(node, _insert(node, value)));
}

function isRed(node) {
  return node != null && node.color == 1;
}

function fillRed(node) {
  if (node != null)
    node.color = 1;

  return node;
}

function isBlack(params) {
  return node == null || node.color == 0;
}

function fillBlack(node) {
  if (node != null)
    node.color = 0;

  return node;
}

function parent(node) {
  if (node != null)
    return node.parent;
  else
    return null;
}

function left(node) {
  if (node != null)
    return node.left;
  else
    return null
}

function right(node) {
  if (node != null)
    return node.right;
  else
    return null;
}

function grandparent(node) {
  return parent(parent(node));
}

function uncle(node) {
  if (isLeft(parent(node))) {
    return right(grandparent(node));
  } else {
    return left(grandparent(node));
  }
}

function isLeft(node) {
  return left(parent(node)) == node;
}

function isRight(node) {
  return right(parent(node)) == node;
}

function search(node, val, closest) {
  if (node == null) return null;
  if (val == value(node)) return node;
  if (val > value(node)) {
    if (closest == true && right(node) == null) {
      return node;
    }
    return search(right(node), val, closest);
  } else {
    if (closest == true && left(node) == null) {
      return node;
    }
    return search(left(node), val, closest);
  }
}

function insert(node, val) {
  let closestNode = search(node, val, true);
  if (value(closestNode) == val) return node;
  else if (value(closestNode) < val) node = balance(insertRight(closestNode, val), node);
  else node = balance(insertLeft(closestNode, val), node);

  return node;
}

function balance(node, root) {
  if (node == root) {
    fillBlack(node);
    return root;
  }

  if (isRed(parent(node))) {
    if (isRed(uncle(node))) {
      fillBlack(parent(node));
      fillBlack(uncle(node));
      fillRed(grandparent(node));

      return balance(grandparent(node), root);
    }

    if (isLeft(parent(node))) {
      if (isRight(node)) {
        node = parent(node);
        root = rotateLeft(node, root);
      }

      fillBlack(parent(node));

      let _gp = grandparent(node);
      fillRed(_gp);
      root = rotateRight(_gp, root);

      return balance(_gp, root);
    } else {
      if (isLeft(node)) {
        node = parent(node);
        root = rotateRight(node, root);
      }

      fillBlack(parent(node));

      let _gp = grandparent(node);
      fillRed(_gp);
      root = rotateLeft(_gp, root);

      return balance(_gp, root);
    }
  }

  return root;
}

function rotateLeft(node, root) {
  let _tmp = right(node);
  setRight(node, left(_tmp));
  setParent(left(_tmp), node);
  setParent(_tmp, parent(node));

  if (parent(node)) {
    if (isLeft(node)) {
      setLeft(parent(node), _tmp);
    } else {
      setRight(parent(node), _tmp);
    }
  } else {
    root = _tmp;
  }

  setLeft(_tmp, node);
  setParent(node, _tmp);

  return root;
}

function rotateRight(node, root) {
  let _tmp = left(node);
  setLeft(node, right(_tmp));
  setParent(right(_tmp), node);
  setParent(_tmp, parent(node));

  if (parent(node)) {
    if (isRight(node)) {
      setRight(parent(node), _tmp);
    } else {
      setLeft(parent(node), _tmp);
    }
  } else {
    root = _tmp;
  }

  setRight(_tmp, node);
  setParent(node, _tmp);

  return root;
}

function treeToStr(root) {
  let lines = [];

  if (root != null) {
    let indentText = "  ";
    let stack = [[root, 0, "ROOT"]];

    while (stack.length > 0) {
      let current = stack.pop();
      let node = current[0];
      let indent = current[1];
      let line = "";

      for (let i = 0; i < indent; i++) {
        line += indentText;
      }

      line += current[2] + "(" + node.toString() + ")";
      lines.push(line);

      if (right(node) != null) stack.push([right(node), indent + 1, "R"]);
      if (left(node) != null) stack.push([left(node), indent + 1, "L"]);
    }
  }

  return lines.join("\n");
}

function depth(node) {
  if (node == null) return 0;
  return Math.max(1 + depth(left(node)), 1 + depth(right(node)));
}

function level(node) {
  if (node == null) return 0;
  return 1 + level(parent(node));
}

export { insert, depth, level, RBNode, treeToStr }