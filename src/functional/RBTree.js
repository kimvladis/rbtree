"use strict";
const Red = 1;
const Black = 0;

function createTree(value) {
  return newNode(Black, value);
}


function insert(node, val) {
  function balanceAdd(node) {
    if (node == undefined) {
      return newNode(Red, val);
    } else if (val < value(node)) {
      return balanceLeft(node, balanceAdd(left(node)), right(node));
    } else if (val > value(node)) {
      return balanceRight(node, left(node), balanceAdd(right(node)));
    } else {
      return node;
    }
  }

  function balanceLeft(node, leftNode, rightNode) {
    if (isBlack(node)) {
      if (isRed(leftNode) && isRed(left(leftNode))) {
        if (isRed(rightNode)) {
          return newNode(Red, value(node), fillBlack(leftNode), fillBlack(rightNode));
        } else {
          let
            x = value(node),
            y = value(leftNode),
            z = value(left(leftNode)),
            a = left(left(leftNode)),
            b = right(left(leftNode)),
            c = right(leftNode),
            d = rightNode;
          return newNode(Black, y, newNode(Red, z, a, b), newNode(Red, x, c, d));
        }
      } else if (isRed(leftNode) && isRed(right(leftNode))) {
        if (isRed(rightNode)) {
          return newNode(Red, value(node), fillBlack(leftNode), fillBlack(rightNode));
        } else {
          let
            x = value(node),
            y = value(right(leftNode)),
            z = value(leftNode),
            a = left(leftNode),
            b = left(right(leftNode)),
            c = right(right(leftNode)),
            d = rightNode;
          return newNode(Black, y, newNode(Red, z, a, b), newNode(Red, x, c, d));
        }
      } else {
        return newNode(color(node), value(node), leftNode, rightNode);
      }
    } else {
      return newNode(color(node), value(node), leftNode, rightNode);
    }
  }

  function balanceRight(node, leftNode, rightNode) {
    if (isBlack(node)) {
      if (isRed(rightNode) && isRed(right(rightNode))) {
        if (isRed(leftNode)) {
          return newNode(Red, value(node), fillBlack(leftNode), fillBlack(rightNode));
        } else {
          let
            x = value(node),
            y = value(rightNode),
            z = value(right(rightNode)),
            a = leftNode,
            b = left(rightNode),
            c = left(right(rightNode)),
            d = right(right(rightNode));
          return newNode(Black, y, newNode(Red, x, a, b), newNode(Red, z, c, d));
        }
      } else if (isRed(rightNode) && isRed(left(rightNode))) {
        if (isRed(leftNode)) {
          return newNode(Red, value(node), fillBlack(leftNode), fillBlack(rightNode));
        } else {
          let
            x = value(node),
            y = value(left(rightNode)),
            z = value(rightNode),
            a = leftNode,
            b = left(left(rightNode)),
            c = right(left(rightNode)),
            d = right(rightNode);
          return newNode(Black, y, newNode(Red, x, a, b), newNode(Red, z, c, d));
        }
      } else {
        return newNode(color(node), value(node), leftNode, rightNode);
      }
    } else {
      return newNode(color(node), value(node), leftNode, rightNode);
    }
  }

  function fillBlack(node) {
    return newNode(Black, value(node), left(node), right(node));
  }

  return fillBlack(balanceAdd(node));
}

function newNode(color, value, leftNode, rightNode) {
  return {
    color: color,
    value: value,
    left: leftNode,
    right: rightNode
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
  return node != undefined && color(node) == Red;
}

function isBlack(node) {
  return node == undefined || color(node) == Black;
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

      let col = color(node) == Red ? 'R' : 'B';
      line += current[2] + "(" + value(node) + ', ' + col + ")";
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

export { insert, depth, createTree, treeToStr }