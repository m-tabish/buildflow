
  //     const prompt = `"Give me steps to create a ${body.projectname} in ${body.language}. The output should be in JSON format with the object with keys : node , process ,code, target should be an array, source should be an array. The "code" should be stored in a separate key called "code". Additionally, ensure that each node includes a unique "nodeId", and that "source" and "target" specify where the edge will start and connect. The response should be valid JSON that can be parsed into a string and back to JSON without errors. Provide a detailed process with code for building ${body.projectname}. Dont keep the nodes linear make it like a tree. Keep the edges in separate key. the format should be this {
  //   "nodeId": "{unique_id}",
  //   "process": "{description_of_process}",
  //   "code": "{code_snippet}",
  //   "target": [
  //     "{target_node_id_1}",
  //     "{target_node_id_2}",
  //     ...
  //   ]
  // }"
  // `;
  //     console.log(prompt)

  // const prompt =
  //   `Generate a detailed step-by-step guide for creating a ${body.projectname} in ${body.language} The description is as follows ${body.projectDescription}. 
  // The output should be a valid JSON format structured as follows: 
  // { 
  //   "nodes": [ 
  //     { 
  //       "nodeId": "{unique_id}", 
  //       "process": "{description_of_process}", 
  //       "code": "{code_snippet}", 
  //       "target": [ 
  //         "{target_node_id_1}", 
  //         "{target_node_id_2}"
  //       ] 
  //     }
  //   ], 
  //   "edges": [ 
  //     { 
  //       "source": "{source_node_id}", 
  //       "target": "{target_node_id}" 
  //     }
  //   ] 
  // } 
  // Please ensure that: 
  // - Each node includes a unique "nodeId". 
  // - "source" and "target" fields in the edges specify the connections between nodes. 
  // - The structure forms a tree rather than a linear arrangement. 
  // - The response is valid JSON that can be parsed without errors. 
  // Provide comprehensive details for building ${body.projectname}, including any relevant code snippets.`;



LATEST BEFORE ROADMAP.SH DESIGN


  const prompt =
    `Generate a detailed step-by-step guide for creating a ${JSON.stringify(body.projectname)} in ${JSON.stringify(body.language)}. 
   The description is as follows: ${JSON.stringify(body.projectDescription)}. 
   The output should be a valid JSON format structured as follows: 
  { 
   { 
     "nodes": [ 
       { 
         "nodeId": "{unique_id}", 
         "process": "{description_of_process}", 
         "code": "{code_snippet}",  
         "resources":
          [
            "technologies": ["<All the full stack technologies/ frameworks that can be used according to the ${body.language}>],
            {
              "resource to read about the code snipper or step you suggested": "relative link for  the topic"
            }   
          ]
         "target": [ 
           "{target_node_id_1}", 
           "{target_node_id_2}"
         ] 
       }
     ], 
     "edges": [ 
       { 
         "source": "{source_node_id}", 
         "target": "{target_node_id}" 
       }
     ] 
   } 
  }
   Please ensure that: 
   - Each node includes a unique "nodeId". 
   - "source" and "target" fields in the edges specify the connections between nodes. 
   - The structure forms a tree and not a linear arrangement. 
   - The response is valid JSON that can be parsed without errors. 
   Provide comprehensive details for building ${JSON.stringify(body.projectname)}, including any relevant code snippets and they shouldn't contain actual piece of code .
   - Keep the response limit size according to the free tier of GeminiAPI
   - Give the most elaborate steps you can generate
   - Imagine you are giving a low level design of the project`;




// _------- 2nd last prompt this has schema different and prompt diff 
 >  const schema = {
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


  const prompt = `
Generate a   step-by-step guide for creating a ${JSON.stringify(body.projectname)} in ${JSON.stringify(body.language)}.
The description is as follows: ${JSON.stringify(body.projectDescription)}.
The output should be a valid JSON format structured as follows: ${schema}
Please ensure that:
- Each node includes a unique "nodeId".
- "source" and "target" fields in the edges specify the connections between nodes.
- The structure forms a tree and not a linear arrangement.
- The response is valid JSON that can be parsed without errors.
- Keep the response limit size according to the free tier of GeminiAPI.
- Give the most elaborate steps you can generate.
- Imagine you are giving a low-level design of the project.`;
