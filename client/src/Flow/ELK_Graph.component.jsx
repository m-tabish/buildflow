/* eslint-disable no-unused-vars */
// src/components/ElkGraph.js
import axios from "axios";
import { log } from "console";
import ELK from 'elkjs/lib/elk.bundled';
import { useEffect, useState } from 'react';

const ElkGraph = () => {
    const [graphLayout, setGraphLayout] = useState(null);

    useEffect(() => {
        const elk = new ELK();
        let nodes = [];
        let edges = [];

        async function getData() {
            try {
                const response = await axios.get("http://localhost:3000/projects/66e57a63d6454e1adc4641ec");
                const children = response.data[0].steps;
                console.log("---- \n" + children);

                if (children) {
                    nodes = children.nodes.map(item => {
                        const nodeId = item.nodeId ? item.nodeId.toString() : null;
                        if (nodeId) {
                            return {
                                id: nodeId,
                                width: parseInt(item.nodeId) * 100,
                                height: 100,
                            };
                        }
                        return null; // Filter out invalid nodes
                    }).filter(Boolean); // Remove null entries

                    edges = children.edges.map(item => {
                        const source = item.source ? item.source.toString() : null;
                        const target = item.target ? item.target.toString() : null;

                        if (source && target) {
                            return {
                                id: item.id ? item.id.toString() : `${source}-${target}`,
                                sources: [source],
                                targets: [target],
                            };
                        }
                        return null; // Filter out invalid edges
                    }).filter(Boolean); // Remove null entries
                }

                const graph = {
                    id: 'root',
                    layoutOptions: {
                        'elk.algorithm': 'layered',
                    },
                    children: nodes,
                    edges: edges,
                };

                const layout = await elk.layout(graph);
                setGraphLayout(layout);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        getData();
    }, []);

    return (
        <div>
            {graphLayout ? (
                <pre>{JSON.stringify(graphLayout, null, 2)}</pre>
            ) : (
                <p>Loading graph...</p>
            )}
        </div>
    );
};

export default ElkGraph;
