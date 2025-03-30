const { GoogleGenerativeAI, SchemaType, Schema } = require("@google/generative-ai");
const dotenv = require('dotenv');
dotenv.config()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


async function generateContent({ projectName, projectDescription, language }) {


  const prompt = `You are tasked with creating a detailed roadmap for a software development project. Your goal is to generate a comprehensive, non-linear roadmap that outlines the steps necessary to implement the core functionality of the project. Keep the response limit strictly under free limit of gemini pro 002 model or your current generation limit. I am experiencing that you are generating very huge responses which come incomplete due to limits in your free tier. I am getting JSON formatting errors. Keep limit strictly under  4000 characters which ever is lesser. Generate proper formatter JSON.

You will be provided with the following information:
orojectname: ${projectName}
projectDescription: ${projectDescription}
language: ${language}  
Your response should be a valid JSON object that adheres to the following schema:
{
  "technologies": [
    "top Libraries or frameworks maximum 4"
  ],
  "description": "{project description in your own words for ${projectDescription}}",
  "steps": {
    "nodes": [
      {
        "nodeId": "{unique_id}",
        "process": "{node_title}",  
        "description": "{node_description}",
        "code": "{code_snippet}",
        "resources": [
          "{most important and relevant relative_link_1}", 
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


Follow these guidelines when generating the roadmap:

1. Start by identifying the top libraries or frameworks (maximum 4) that are most suitable for the project based on the given description and programming language.

2. Write a concise project description in your own words, summarizing the main goals and features of the project.

3. Create at least 30 nodes, each representing a step in the development process. Focus on the implementation of the core functionality of the project. You are most welcomed to generate more nodes there is not limit.

4. For each node:
   a. Assign a unique nodeId.
   b. Provide a clear and concise process title.
   c. Write a detailed description of the step, by step  its purpose and importance in the project.
   d. Include a relevant code snippet that demonstrates the implementation of this step. The code should be in the specified programming language and as specific as possible to the project requirements.
   e. Provide at least two relevant resources (such as documentation links, tutorials, or articles) that can help with implementing this step.
   f. Specify the target node(s) that logically follow this step in the development process.

5. Create edges to connect the nodes, ensuring that:
   a. The source and target fields clearly specify the connections between nodes.
   b. Each edge has a descriptive label explaining the relationship between the connected nodes.

6. Structure the roadmap in a non-linear fashion,generate at least 30 nodes and maximum 20000 tokens but avoid making it  complex or confusing.

7. Prioritize the core functionality of the project. Do not include steps for deployment, pipelines, or DevOps unless specifically mentioned in the project description.

8. Ensure that each step is as detailed as possible, providing specific implementation guidance rather than general comments.

9. Remember to generate the response as a valid JSON object that can be easily parsed without errors. Double-check that all required fields are present and correctly formatted .

10. Keep the response limit strictly under free limit of gemini free or your current generation limit. I am experiencing that you are generating very huge responses which come incomplete due to limits in your free tier. Also try to generate the nodes like a tree and not straight line.

<Remember>11. I am seeing you are not providing the edges object. Strictly follow the given format of JSON  
 Your response should be a valid JSON object that adheres to the following schema:
{
  "technologies": [
    "top Libraries or frameworks maximum 4"
  ],
  "description": "{project description in your own words for ${projectDescription}}",
  "steps": {
    "nodes": [
      {
        "nodeId": "{unique_id}",
        "process": "{node_title}",  
        "description": "{node_description}",
        "code": "{code_snippet}",
        "resources": [
          "{most important and relevant relative_link_1}", 
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
<Remember>
`

  let model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: { responseMimeType: "application/json", maxOutputTokens: 20000 }
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
//     projectName: " Game",
//     projectDescription: "a snake game",
//     language: "python ",
// })  
module.exports = { generateContent };