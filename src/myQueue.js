const Node = require('./queueNode');

class Queue {
    constructor() {
        this._head=null;
        this._tail=null; 
        this.length=0;
    }
    append(data) {
        if (this.length==0){
            this._head=this._tail=new Node(data);
        } else {
            let newNode=new Node(data,this._tail);
            this._tail.next=newNode;
            this._tail=newNode;
        }
        this.length++;     
        return this;
    }
    head() {
        return this._head?this._head.data:null;
    }    
    deleteAt(index) {
        if (this.length<1||this.length<index) return;
        if (index==this.length-1) {
            this._tail=this._tail.prev;
            this._tail=null;
            
        } else if (index==0&&this.length==1){
            this._head=null;
            this._tail==null;           
        } else {
            let pos=this._head;
            for (let i=0;i<index-2;i++){
                pos=pos.next;
            }
            pos.next=pos.next.next;
            pos.next.prev=pos;
        }
        this.length--;         
        return this;
    }
    pull(){
        let res=this._head();
        this.deleteAt(0);
        return res;
    }
    tail() {
        return this._tail?this._tail.data:null;
    }
}