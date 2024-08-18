
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv')
dotenv.config()
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateContent(body) {
 const prompt = `Give me steps to create a ${body.projectname} in ${body.language}. The output should be in JSON format with the object with keys : node , process ,code, target should be an array, source should be an array. The "code" should be stored in a separate key called "code". Additionally, ensure that each node includes a unique "nodeId", and that "source" and "target" specify where the edge will start and connect. The response should be valid JSON that can be parsed into a string and back to JSON without errors. Provide a detailed process with code for building ${body.projectname}. Dont keep the nodes linear make it like a tree. Keep the edges in separate key`;
    // console.log(prompt)
    let model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        // Set the `responseMimeType` to output JSON
        generationConfig: { responseMimeType: "application/json" }
    });

    try {
        let result = await model.generateContent(prompt);
        // console.log(result);  // Assuming the response has a `text` method
        return result;
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
