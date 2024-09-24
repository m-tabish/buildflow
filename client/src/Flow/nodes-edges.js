import axios from "axios";

export let initialNodes = [];
export let initialEdges = [];

export default async function getData() {
  try {
    const response = await axios.get("http://localhost:3000/projects/66f243a5440f594bf4227f9b");

    if (response) {
      const children = response.data[0].steps;


      // Mapping nodes
      initialNodes = children.nodes.map((item) => {
        const nodeId = item.nodeId ? item.nodeId.toString() : null;
        if (nodeId) {
          return {
            id: nodeId,
            // Passing item object in the custom-node
            data: { label: JSON.stringify(item) || "step x" },
            position: { x: 0, y: parseInt(nodeId) * 100 }, // Set default position
            draggable: false,
            resizing: true,
            nodeType: "group"
          };
        }
        return null; // Filter out invalid nodes
      }).filter(Boolean); // Remove null entries

      // Mapping edges
      initialEdges = children.edges.map((item) => {
        const source = item.source;
        const target = item.target;

        if (source && target) {
          return {
            id: `${source}-${target}`,
            source: source,
            target: target,
            type: "default",
            style: { stroke: "white" }
          };
        }
        return null; // Filter out invalid edges
      }).filter(Boolean); // Remove null entries

      return { initialNodes, initialEdges };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
