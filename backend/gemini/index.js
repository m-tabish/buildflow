const { GoogleGenerativeAI, SchemaType, Schema } = require("@google/generative-ai");
const dotenv = require('dotenv');
dotenv.config()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// console.log(process.env.GEMINI_API_KEY); // working
async function generateContent(body) {
  const prompt = `
Create a roadmap for the a project called ${body.projectname} which is ${body.projectDescription} in ${body.language} .
Requirements:
- Each node must have a unique nodeId.
- The source and target fields in the edges should clearly specify the connections between nodes.
- The structure must form a non-linear roadmap but shouldn't be confusing.
- Be as detailed in creating each step as you can.  
- The response should be valid JSON, easily parseable without errors.  
- Please generate the response as a JSON object following this schema. 
- Generate a highly elaborate response steps with  focusing  on implementation of the core functionality of the project. 
- Do not try to fit all the steps like deployement, pipelines , devops unless specifically asked. 
- Try explain each step of the core functionality and other steps in general. Always generate at least 15 nodes.
- (Generate as many steps as you can.)
- I can see sometimes you are leaving the code with simple general comments and not giving actual code. 
- Always give what actal code would look like . And give me resources for every step
Strictly adhere to the following schema:
{
  "technologies": [
    "top Libraries or frameworks maximum 4"
  ],
  "description": "{project description in your own words for ${body.projectDescription}}",
  "steps": {
    "nodes": [
      {
        "nodeId": "{unique_id}",
        "process": "{node_title}",  
        "description": "{node_description}",
        "code": "{code_snippet}",
        "resources": [
          "{relative_link_1}",
          "{relative_link_2}"
        ],
        "target": [
          "{target_node_id_1}",
          "{target_node_id_2}"
        ]
      }
    ],
    "edges": [
      {
        "source": "{source_node_id}",
        "target": "{target_node_id}",
        "label": "{edge_label}"
      }
    ]
  }
}

`;

  // "technologies": "{Languages frameworks and libraries used. Only top 4 most used.}",
  // "description": "{A brief description of the project by you.}"

  let model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro-002",
    generationConfig: { responseMimeType: "application/json", maxOutputTokens: 1500 }
  });

  try {
    let result = await model.generateContent(prompt);
    // console.log(result);  // Assuming the response has a `text` method 
    console.log(JSON.stringify(result.response.text()));

    return result.response.text();
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}
// generateContent({
//     projectname: " Game",
//     projectDescription: "a snake game",
//     language: "python ",
// })
module.exports = { generateContent };