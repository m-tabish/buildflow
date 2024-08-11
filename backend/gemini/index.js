
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv')
dotenv.config()
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateContent(body) {
    const prompt = `Give me steps to create a  ${body.projectname} in ${body.language}. Keep the format in JSON like step:1, process: create a folder named . You can also provide substeps. they will follow the same flow step1 : process. give a detailed answer and keep the code in different key called code`
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
