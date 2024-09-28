const schema = {
    description: `short description of the project `,
    type: "object",
    properties: {
        description: {
            type: "string",
            description: "Short explanation of what the project is about in the AI's own words",
            nullable: false,
        },
        nodes: {
            type: "array",
            description: "List of nodes representing each step of the project",
            items: {
                type: "object",
                properties: {
                    nodeId: {
                        type: "string",
                        description: "A unique identifier for the node",
                        nullable: false,
                    },
                    process: {
                        type: "string",
                        description: "Description of the process for this step",
                        nullable: false,
                    },
                    code: {
                        type: "string",
                        description: "Code snippet associated with this step",
                        nullable: false,
                    },
                    resources: {
                        type: "string",
                        description: "Relative link or resources related to the topic",
                        nullable: true,
                    },
                    target: {
                        type: "array",
                        description: "List of target node IDs that this node connects to",
                        items: {
                            type: "string",
                            description: "The ID of the target node",
                            nullable: false,
                        },
                        nullable: true,
                    },
                },
                required: ["nodeId", "process", "code"],
            },
        },
        edges: {
            type: "array",
            description: "List of edges representing connections between nodes",
            items: {
                type: "object",
                properties: {
                    source: {
                        type: "string",
                        description: "ID of the source node",
                        nullable: false,
                    },
                    target: {
                        type: "string",
                        description: "ID of the target node",
                        nullable: false,
                    },
                },
                required: ["source", "target"],
            },
        },
    },
    required: ["description", "nodes", "edges"],
};
 