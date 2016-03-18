import RBTree from './RBTree.js';

var tree = new RBTree();
tree.insert(10);

function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
for (let i = 0; i <= 20; i++) {
  tree.insert(getRandomInt(0,20));
}

console.log(tree.toString());
