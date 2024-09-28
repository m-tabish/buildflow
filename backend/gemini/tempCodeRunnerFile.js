const prompt = `
Please provide a JSON object that matches the following requirements:
- Include a "description" field explaining the project.
- Include an array of "nodes" with each node having a "nodeId", "process", "code", and optional "resources" and "target".
- Include an array of "edges" with each edge having "source" and "target".
- Ensure the response is strictly valid JSON.
`;