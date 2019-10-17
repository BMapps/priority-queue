const Node = require('./node');
// const Queue = require('./myQueue');

class MaxHeap {
	constructor() {
		this.root=null;
		this.parentNodes=[];
		this.lastInsertedNode=[];
		this._size=0;
		
	}

	push(data, priority) {
		this.shiftNodeUp(this.insertNode(new Node(data,priority)));
		this._size++;	
	}

	pop() {
		this._size--;
		if (this.root===null) return;
		let detached=this.detachRoot();
		if(detached.left===null&&detached.right===null){
			this.restoreRootFromLastInsertedNode();
			return detached.data;
		} this.restoreRootFromLastInsertedNode(detached);		
		this.shiftNodeDown(this.root);		
		return detached.data;
	}

	detachRoot() {
		let res=this.root;
		if (this.parentNodes[0]==this.root) this.parentNodes.shift();		
		if(res.left===null&&res.right===null) this.root=null;
		return res;		
	}

	restoreRootFromLastInsertedNode(detached) {
		if (detached===undefined) return;	
		if (this.parentNodes.length===0) return;
		if (this.parentNodes.length==1) {
			this.root=this.parentNodes[0];
			this.parentNodes[0].parent=null;
			return;
		}		
		if (this.parentNodes[this.parentNodes.length-1]!=detached.left){
			this.parentNodes[this.parentNodes.length-1].left=detached.left;
			if (this.parentNodes[this.parentNodes.length-1].left!=null) {
				this.parentNodes[this.parentNodes.length-1].left.parent=this.parentNodes[this.parentNodes.length-1];
			}
		} else this.parentNodes[this.parentNodes.length-1].left=null;		
		if(this.parentNodes[this.parentNodes.length-1]!=detached.right){
			this.parentNodes[this.parentNodes.length-1].right=detached.right;
			if (this.parentNodes[this.parentNodes.length-1].right!=null){
				this.parentNodes[this.parentNodes.length-1].right.parent=this.parentNodes[this.parentNodes.length-1];
			}else {
				this.parentNodes.unshift(this.parentNodes[this.parentNodes.length-1]);
			}
		} else this.parentNodes[this.parentNodes.length-1].right=null;
		if (this.parentNodes[this.parentNodes.length-1].parent!=detached&&this.parentNodes[this.parentNodes.length-1].parent.right==this.parentNodes[this.parentNodes.length-1]){
			this.parentNodes.unshift(this.parentNodes[this.parentNodes.length-1].parent);			
		}
		this.parentNodes[this.parentNodes.length-1].parent.removeChild(this.parentNodes[this.parentNodes.length-1]);		
		this.root=this.parentNodes[this.parentNodes.length-1];
		this.parentNodes.pop();
		if(this.root.left===null||this.root.right===null) this.parentNodes.unshift(this.root);	
	}

	size() {
		return this._size;
	}

	isEmpty() {
		return this._size==0;
	}

	clear() {
		this.root=null;
		this.parentNodes=[];	
		this._size=0;	
	}

	insertNode(node) {
		if (this.root===null){			
			this.root=node;
			this.parentNodes.push(node);
			return node;
		}
		if(this.parentNodes[0].left===null){
			this.parentNodes[0].left=node;
			node.parent=this.parentNodes[0];
			this.parentNodes.push(node);
			return node;
		}
		this.parentNodes[0].right=node;
		node.parent=this.parentNodes[0];
		this.parentNodes.push(node);
		this.parentNodes.shift();
		return node;			
	}

	shiftNodeUp(node) {
		if (node.parent===null||node.priority<=node.parent.priority) return true;
		if (this.parentNodes[0]==node.parent){
			this.parentNodes[this.parentNodes.length-1]=this.parentNodes[0];
			this.parentNodes[0]=node;
		}else if(node.right==null){
			this.parentNodes[this.parentNodes.indexOf(node)]=node.parent;		
		}
		node.swapWithParent();
		if (node.parent===null) this.root=node;
		return this.shiftNodeUp(node);		
	}

	shiftNodeDown(node) {
		if (node.right===null){
			if (node.left===null) return true;
			else {
				if (node.left.priority<node.priority) return true;
				this.parentNodes[0]=node.left;
				this.parentNodes.pop();
				this.parentNodes.push(node);
				node.left.swapWithParent();				
				if (node.parent.parent===null) this.root=node.parent;
			}
		}else{ 
			if(node.left===null){
				if (node.right.priority<node.priority) return true;
				this.parentNodes[0]=node.right;
				this.parentNodes.pop();
				this.parentNodes.push(node);
				node.right.swapWithParent();				
				if (node.parent.parent===null) this.root=node.parent;
			} else{
				if (node.right.priority>node.left.priority){
					if (node.right.priority<node.priority) return true;
					if (node.right.right===null){
						this.parentNodes[this.parentNodes.indexOf(node.right)]=node;
						node.right.swapWithParent();
						if (node.parent.parent===null) this.root=node.parent;

					}else{
						node.right.swapWithParent();
						if (node.parent.parent===null) this.root=node.parent;
					}
				}else{
					if (node.left.priority<node.priority) return true;
					if (node.left.right===null){
						this.parentNodes[this.parentNodes.indexOf(node.left)]=node;
						node.left.swapWithParent();
						if (node.parent.parent===null) this.root=node.parent;
					}else{
						node.left.swapWithParent();
						if (node.parent.parent===null) this.root=node.parent;
					}
				}
			}	
		}
		return this.shiftNodeDown(node);		
	}
 }
module.exports = MaxHeap;
