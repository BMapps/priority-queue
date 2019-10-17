class Node {
	constructor(data, priority) {
		this.data=data;
		this.priority=priority;
		this.left=null;
		this.right=null;
		this.parent=null;
	}

	appendChild(node) {
		if (this.left==null) {
			this.left=node;
			node.parent=this;
			return true;
		}
		if ( this.right==null) {
			this.right=node;
			node.parent=this;
			return true;
		}
		return false;
	}

	removeChild(node) {
		if (this.left==node){
			node.parent=null;
			this.left=null;
			return true;
		}
		if (this.right==node){			
			node.parent=null;
			this.right=null;
			return true;
		}
		throw new Error();
	}

	remove() {
		if (this.parent!=null){
			this.parent.removeChild(this);
		}
		
	}

	swapWithParent() {		
		if (this.parent===null) return;
		if (this.parent.left==this){
			this.parent.left=this.left;
			this.left=this.parent;
			if (this.parent.left!=null) this.parent.left.parent=this.parent;
			this.switchChild(this, this.parent, "right");
			
		}else {
			this.parent.right=this.right;
			this.right=this.parent;
			if (this.parent.right!=null) this.parent.right.parent=this.parent;
			this.switchChild(this, this.parent, "left");
		}
		if (this.parent.parent===null){
			this.parent.parent=this;
			this.parent=null;			
		}else {			
			if (this.parent.parent.left==this.parent){	
				this.parent=this.parent.parent;		
				this.parent.left.parent=this;
				this.parent.left=this;
			}else{
				this.parent=this.parent.parent;
				this.parent.right.parent=this;
				this.parent.right=this;

			}
		}
		
	}
	switchChild(node1, node2, child){
		let temp=node1[child];
		node1[child]=node2[child];
		node2[child]=temp;
		if (node1[child]!=null){
			node1[child].parent=node1;
		}
		if (node2[child]!=null){
			node2[child].parent=node2;
		}
	}
}
module.exports = Node;
