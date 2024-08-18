class Node {
    constructor(id, position, data, code) {
        this.id = id;
        this.position = position;
        this.data = data;
        this.draggable = true;
        this.selectable = false;
        this.sourcePosition = "right";
        this.targetPosition = "left";
        this.height = 180
        this.width = 150
        this.code = code
    }
}

export default Node  