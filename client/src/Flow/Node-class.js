class Node {
    constructor(id, position, data) {
        this.id = id;
        this.position = position;
        this.data = data;
        this.draggable = true;
        this.selectable = false;
        this.sourcePosition = "right";
        this.targetPosition = "left";
        this.height = 180
        this.width = 150
    }
}

export default Node  