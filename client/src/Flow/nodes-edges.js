import axios from "axios";

export let initialNodes = [];
export let initialEdges = [];

export default async function getData() {
  try {
    const response = await axios.get("http://localhost:3000/projects/66e57a63d6454e1adc4641ec");

    if (response) {
      const children = response.data[0].steps;

      // Mapping nodes
      initialNodes = children.nodes.map((item) => {
        const nodeId = item.nodeId ? item.nodeId.toString() : null;
        if (nodeId) {
          return {
            id: nodeId,
            data: { label: item.process },
            position: { x: 0, y: 0 }, // Set default position
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
            type: "smoothstep",
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
