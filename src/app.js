"use strict";

import RBTree from './oop/RBTree';
import { insert, depth, level, treeToStr, createTree } from './functional/RBTree'

var n = 1000000;

var testData = [];

for (let i = n; i >= 0; i--) {
  testData.push(getRandomInt(0, n));
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** functional paradigm */
console.time('functional');

var fTree = createTree(10);

testData.forEach(function (value) {
  fTree = insert(fTree, value);
});

console.timeEnd('functional');
console.log('depth:', depth(fTree));

/** oop paradigm */
console.time('oop');

var tree = new RBTree();
tree.insert(10);

testData.forEach(function (value) {
  tree.insert(value);
});

console.timeEnd('oop');
console.log('depth:', depth(tree.root));
console.log('log(n):', Math.log2(n));

console.time('sort');
testData.sort(function (a, b) {
  return a - b;
});
console.timeEnd('sort');
