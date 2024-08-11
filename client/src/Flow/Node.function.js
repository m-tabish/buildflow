/* eslint-disable no-unused-vars */
import axios from "axios";
import Edge from "./Edge-class";
import Node from "./Node-class";
let DBnodes;
let labels;
async function Nodes() {
    DBnodes = await axios.get('http://localhost:3000/projects')
    let nodes = []
    let edges = []
    //Edge style
    const edgeStyle = { stroke: '#00ff00', strokeWidth: 2 }

    //Extracting steps from result 
    labels = DBnodes.data[0].steps.steps


    // Create Node 
    labels.forEach((node, index) => {
        nodes.push(new Node(
            (index + 1).toString(),
            { x: index * 200, y: 100 },
            // {label : "labels"}
            { label: labels[index].process }
        ));

        // Create Edge only if there's a next node
        if (index < labels.length - 1) {
            edges.push(new Edge(
                `e${index}-${index + 1}`,
                (index + 1).toString(),
                (index + 2).toString(),
                edgeStyle
            ));
        }
    });



    return { nodes, edges }
}
export default Nodes
