 function RBNode(value) {
     this.value = value;
     this.left  = null;
     this.right = null;
     this.parent = null;
     this.color = 0;
 }

 RBNode.prototype.toString = function() {
     var color = this.color == 1 ? 'R' : 'B';
     return color + ' - ' + this.value.toString();
 };

 RBNode.prototype.fillRed = function() {
     this.color = 1;
 }

 RBNode.prototype.isRed = function() {
     return this.color == 1;
 }

 RBNode.prototype.fillBlack = function() {
     this.color = 0;
 }

 RBNode.prototype.isBlack = function() {
     return this.color == 0;
 }

 RBNode.prototype.insertLeft = function(value) {
     this.left = new RBNode(value);
     this.left.parent = this;
     return this.left;
 }

 RBNode.prototype.insertRight = function(value) {
     this.right = new RBNode(value);
     this.right.parent = this;
     return this.right;
 }

 function rotateLeft(node, root) {
     if (node.right != null) {
         var tmp = node.left;
         node.left = node.parent;
         node.parent = node.left.parent;
         node.left.parent = node;
         node.left.right = tmp;
         if (node.parent == null) root = node;
     }
     return root;
 }

 function rotateRight(node) {
     if (node.left != null) {
         var tmp = node;
         node = node.left;
         node.parent = tmp.parent;
         tmp.left = node.left;
         if (tmp.left != null)
             tmp.left.parent = tmp;
         node.right = tmp;
         tmp.parent = node;
     }
 }

 function grandparent(node) {
     if (node != null && node.parent != null) {
         return node.parent.parent;
     } else {
         return null;
     }
 }

 function uncle(node) {
     var g = grandparent(node);
     if (g == null) return null;
     if (node.parent == g.left) {
         return g.right;
     } else {
         return g.left;
     }
 }

 function isLeft(node) {
     return node.parent == null || node.parent.left == node;
 }

 function isRight(node) {
     return node.parent == null || node.parent.right == node;
 }

 function balance(node, root) {
     var u = uncle(node);
     if (u != null && u.isRed()) {
         u.fillBlack();
         node.parent.fillBlack();
         var g = grandparent(node);
         g.fillRed();
         return balance(g, root);
     } else if (u == null || u.isBlack()) {
         if (node.parent == null) return root;
         if (isRight(node) && isRight(node.parent)) {
             root = rotateLeft(node, root);
         } else if (isLeft(node) && isLeft(node.parent)) {
             rotateRight(node);
         }
         if (node.parent != null) {
             node.parent.fillBlack();
             return balance(node.parent, root);
         }
     }
     return root;
 }

 function insert(value, root) {
     var closest = searchClosest(value, root);
     var newNode;
     if (value == closest.value) {
         return false;
     } else if (value < closest.value) {
         newNode = closest.insertLeft(value);
     } else {
         newNode = closest.insertRight(value);
     }
     newNode.fillRed();
     return balance(newNode, root);
 }

 function searchHelper(value, root, isClosest) {
     if (root == null) {
         return false;
     } else if (value == root.value) {
         return root;
     } else if (value < root.value) {
         if (isClosest && root.left == null) return root;
        
         return searchHelper(value, root.left, isClosest);
     } else {
         if (isClosest && root.right == null) return root;
        
         return searchHelper(value, root.right, isClosest);
     }
 }

 function searchClosest(value, root) {
     return searchHelper(value, root, true);
 }

 function search(value, root) {
     return searchHelper(value, root, false);
 }

 function print(root) {
     var lines = [];

     if ( root != null ) {
         var indentText = "  ";
         var stack = [[root, 0, "^"]];

         while ( stack.length > 0 ) {
             var current = stack.pop();
             var node    = current[0];
             var indent  = current[1];
             var line    = "";

             for ( var i = 0; i < indent; i++ ) {
                 line += indentText;
             }
            
             line += current[2] + "(" + node.toString() + ")";
             lines.push(line);

             if ( node.right != null ) stack.push([node.right, indent+1, "R"]);
             if ( node.left  != null ) stack.push([node.left,  indent+1, "L"]);
         }
     }
    
     return lines.join("\n");
 }

 function getRandomInt(min, max)
 {
   return Math.floor(Math.random() * (max - min + 1)) + min;
 }


 var root = new RBNode(1);
 for (var i = 2; i < 20; i++) {
     root = insert(i, root);
     var str = print(root);
     console.log(str);
 }

 var str = print(root);

 console.log(str);