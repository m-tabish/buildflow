
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv')
dotenv.config()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log(process.env.VITE_GEMINI_API_KEY);
async function generateContent(body) {


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
    // console.log(prompt)


    const prompt = "Generate a detailed step-by-step guide for creating a " + body.projectname + " in " + body.language + ". " +
" The output should be a valid JSON format structured as follows: " +
"{ " +
"  \"nodes\": [ " +
"    { " +
"      \"nodeId\": \"{unique_id}\", " +
"      \"process\": \"{description_of_process}\", " +
"      \"code\": \"{code_snippet}\", " +
"      \"target\": [ " +
"        \"{target_node_id_1}\", " +
"        \"{target_node_id_2}\", " +
"        ... " +
"      ] " +
"    }, " +
"    ... " +
"  ], " +
"  \"edges\": [ " +
"    { " +
"      \"source\": \"{source_node_id}\", " +
"      \"target\": \"{target_node_id}\" " +
"    }, " +
"    ... " +
"  ] " +
"} " +
"Please ensure that: " +
"- Each node includes a unique \"nodeId\". " +
"- \"source\" and \"target\" fields in the edges specify the connections between nodes. " +
"- The structure forms a tree rather than a linear arrangement. " +
"- The response is valid JSON that can be parsed without errors. " +
"Provide comprehensive details for building " + body.projectname + ", including any relevant code snippets.";

    let model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
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
