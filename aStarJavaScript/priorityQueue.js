/**
 * Represents an item that the queue will take
 */
class QueueItem {
    constructor(item, priority) {
        this.item = item;
        this.priority = priority;
    }
}

/**
 * Queue that automatically sorts items by priority order
 */
class PriorityQueue {
    constructor() {
        this.items = [];
    }
    
    /**
     * Adds an item to the queue to be sorted by priority
     * @param {element} item 
     * @param {int} priority 
     */
    enqueue(item, priority){
        let qItem = new QueueItem(item, priority);
        let contain = false;

        // Check if item has the highest priority
        for (let i = 0; i < this.items.length; i++){
            if (this.items[i].priority > qItem.priority){
                this.items.splice(i, 0, qItem);
                contain = true;
                break;
            }
        } 

        // Item has the highest priority | Send to the top of the queue
        if (!contain){
            this.items.push(qItem);
        }
    }

    /**
     * Retrieves and removes the first item in the queue
     */
    dequeue(){
        if (this.isEmpty()){
            return "Queue is empty!";
        }

        return this.items.shift();
    }

    /**
     * Retrieves but does not remove the first item in the queue
     */
    first(){
        if (this.isEmpty()){
            return "Queue is empty!";
        }
        return this.items[0];
    }

    /**
     * Retrieves but does not remove the last item in the queue
     */
    last(){
        if (this.isEmpty()){
            return "Queue is empty!";
        }
        return this.items[this.items.length - 1];
    }

    /**
     * Retrieves and removes last item in the queue
     */
    pop(){
        if (this.isEmpty()){
            return "Queue is empty!";
        }
        return this.items.pop();
    }

    /**
     * Returns if queue is empty
     */
    isEmpty(){
        return this.items.length == 0;
    }

    /**
     * Returns if queue has the item
     * @param {Item} item 
     */
    has(item){
        for (let i = 0; i < this.items.length; i++){
            if (this.items[i].item === item){
                return true;
            }
        }

        return false;
    }
}

export default PriorityQueue;