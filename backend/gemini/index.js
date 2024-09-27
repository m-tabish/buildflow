const { GoogleGenerativeAI, SchemaType } = require("@google/generative-ai");
const dotenv = require('dotenv')
dotenv.config()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

console.log(process.env.VITE_GEMINI_API_KEY);
async function generateContent(body) {
  //   const prompt = `
  // { 
  //    {   
  //       "technologies": ["<All the full stack technologies/frameworks that can be used according to the ${body.language}>"]
  //    }, 
  //   "nodes": [ 
  //     { 
  //       "nodeId": "{unique_id}", 
  //       "process": "{node title}", 
  //       "description": "{node description}", s
  //       "code": "{code snippet}",  
  //       "<resources to read about the step you suggested>": ["relative link for each node on the topic"],
  //       "target": [ 
  //         "{target_node_id_1}", 
  //         "{target_node_id_2}"
  //       ] 
  //     }
  //   ], 
  //   "edges": [ 
  //     { 
  //       "source": "{source_node_id}", 
  //       "target": "{target_node_id}", 
  //       "label": "{edge label}" 
  //     }
  //   ] 
  // }

  // Requirements:

  // - Each node should have a unique nodeId.
  // - Keep the response according to your free generation limit so that and don't give half responses.
  // - Keep the response within your generation limit.
  // - The source and target fields in the edges should specify the connections between nodes.
  // - The structure should form a non-linear roadmap.
  // - The response should be valid JSON that can be parsed without errors.
  // - Give the most elaborate steps you can generate. 
  // - Do not just give an overview of the steps like create backend. 
  // - Have a main branch in middle and then leaf branches around it.
  // - Additional notes:
  //   - The label field in the edges can be used to describe the relationship between the connected nodes.
  //   - For a non-linear roadmap, consider using multiple target nodes for some nodes to create branches and parallel paths.

  // `;

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
  const prompt =
    `Generate a detailed step-by-step guide for creating a ${body.projectname} in ${body.language} The description is as follows ${body.projectDescription}. 
  The output should be a valid JSON format structured as follows: 
   ${schema}
  Please ensure that: 
  - Each node includes a unique "nodeId". 
  - "source" and "target" fields in the edges specify the connections between nodes. 
  - The structure forms a tree rather than a linear arrangement. 
  - The response is valid JSON that can be parsed without errors. 
  Provide comprehensive details for building ${body.projectname}, including any relevant code snippets.`;

  console.log(prompt); // checking prompt output


  let model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro-002",
    // Set the `responseMimeType` to output JSON
    generationConfig: { responseMimeType: "application/json", responseSchema: schema, }
  });

  try {
    let result = await model.generateContent(prompt);
    // console.log(result);  // Assuming the response has a `text` method
    console.log(result.response.text());

    return result.response.text();
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
  // return "gemeini disable for"
}
// generateContent({
//     projectname: " Game",
//     language: "java",
// })
module.exports = { generateContent };
