const { GoogleGenerativeAI, SchemaType, Schema } = require("@google/generative-ai");
const dotenv = require('dotenv');
dotenv.config()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyBVgS_a6o7RwD0Y7bIRC97DlAVs4Ehn9II");
// console.log(process.env.GEMINI_API_KEY); // working
async function generateContent(body) {
    const prompt = `
Create a roadmap for the a project called ${body.projectname} which is ${body.projectDescription} in ${body.language} .
Requirements:
- Each node must have a unique nodeId.
- Ensure the response stays within the 1024-token generation limit to maintain valid JSON; avoid half responses.
- The source and target fields in the edges should clearly specify the connections between nodes.
- The structure must form a non-linear roadmap with a main branch and leaf branches.
- The response should be valid JSON, easily parseable without errors.  
Please generate the response as a JSON object following this schema. 
Keep the response concise and free from unnecessary details, and ensure code snippets are succinct. Strictly adhere to the following schema:

{
  "nodes": [
    {
      "nodeId": "{unique_id}",
      "process": "{node title}",
      "description": "{node description}",
      "code": "{code snippet}",
      "resources": ["relative link for each node on the topic"],
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
      "label": "{edge label}"
    }
  ]
}
`;



    let model = genAI.getGenerativeModel({
        model: "gemini-1.5-pro-latest",
        generationConfig: { responseMimeType: "application/json" }
    });

    try {
        let result = await model.generateContent(prompt);
        // console.log(result);  // Assuming the response has a `text` method
        console.log(result.response.text().slice(0, 100));

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