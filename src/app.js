import RBTree from './oop/RBTree';
import { insert, height, treeToStr, createTree, value } from './functional/RBTree';

const n = 1023;

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

testData.forEach((v) => {
  fTree = insert(fTree, v);
});

console.timeEnd('functional');
console.log('height:', height(fTree));
console.log('root:', value(fTree));
console.log('---------------------------');

/** oop paradigm */
console.time('oop');

const tree = new RBTree();
tree.insert(10);

testData.forEach((v) => {
  tree.insert(v);
});
console.timeEnd('oop');
console.log('height:', tree.depth());
console.log('root:', tree.root.getValue());
console.log('---------------------------');

console.log('2 * log(n + 1):', 2 * Math.log2(n + 1));

console.time('sort');
testData.sort((a, b) => a - b);
console.timeEnd('sort');
