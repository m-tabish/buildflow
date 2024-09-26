
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv')
dotenv.config()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log(process.env.VITE_GEMINI_API_KEY);
async function generateContent(body) {

 
// const prompt = 
//   `Generate a detailed step-by-step guide for creating a ${JSON.stringify(body.projectname)} in ${JSON.stringify(body.language)}. 
//    The description is as follows: ${JSON.stringify(body.projectDescription)}. 
//    The output should be a valid JSON format structured as follows: 
//    { 
//      "nodes": [ 
//        { 
//          "nodeId": "{unique_id}", 
//          "process": "{description_of_process}", 
//          "code": "{code_snippet}", 
//          "target": [ 
//            "{target_node_id_1}", 
//            "{target_node_id_2}"
//          ] 
//        }
//      ], 
//      "edges": [ 
//        { 
//          "source": "{source_node_id}", 
//          "target": "{target_node_id}" 
//        }
//      ] 
//    } 
//    Please ensure that: 
//    - Each node includes a unique "nodeId". 
//    - "source" and "target" fields in the edges specify the connections between nodes. 
//    - The structure forms a tree rather than a linear arrangement. 
//    - The response is valid JSON that can be parsed without errors. 
//    Provide comprehensive details for building ${JSON.stringify(body.projectname)}, including any relevant code snippets.`;
const prompt =
  `Generate a detailed step-by-step guide for creating a ${JSON.stringify(body.projectname)} in ${JSON.stringify(body.language)}. 
   The description is as follows: ${JSON.stringify(body.projectDescription)}. 
   The output should be a valid JSON format structured as follows: 
   { 
     "nodes": [ 
       { 
         "nodeId": "{unique_id}", 
         "process": "{description_of_process}", 
         "code": "{code_snippet}", 
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
   Please ensure that: 
   - Each node includes a unique "nodeId". 
   - "source" and "target" fields in the edges specify the connections between nodes. 
   - The structure forms a tree rather than a linear arrangement. 
   - The response is valid JSON that can be parsed without errors. 
   Provide comprehensive details for building ${JSON.stringify(body.projectname)}, including any relevant code snippets.
   - Keep the response limit size according to the free tier of GeminiAPI
   - Give me the most detailed steps you can generate`;


console.log(prompt); // Debugging: Check the prompt output


  let model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro-002",
    // Set the `responseMimeType` to output JSON
    generationConfig: { responseMimeType: "application/json" }
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
