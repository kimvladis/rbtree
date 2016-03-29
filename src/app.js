import RBTree from './oop/RBTree';
import { insert, depth, treeToStr, createTree } from './functional/RBTree';

const n = 100000;

const testData = [];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (let i = n; i >= 0; i--) {
  testData.push(getRandomInt(0, n));
}

/** functional paradigm */
console.time('functional');

let fTree = createTree(10);

testData.forEach((value) => {
  fTree = insert(fTree, value);
});

console.timeEnd('functional');
console.log('depth:', depth(fTree));

/** oop paradigm */
console.time('oop');

const tree = new RBTree();
tree.insert(10);

testData.forEach((value) => {
  tree.insert(value);
});

console.timeEnd('oop');
console.log('depth:', depth(tree.root));
console.log('log(n):', Math.log2(n));

console.time('sort');
testData.sort((a, b) => a - b);
console.timeEnd('sort');
