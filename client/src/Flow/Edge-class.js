class Edge {
    constructor(id, source, target, style) {
        this.id = id;
        this.source = source;
        this.target = target
        this.animated = true
        this.draggable = true; // Ensure nodes are draggable
        this.selectable = true;
        this.style = style
    }
}
export default Edge  