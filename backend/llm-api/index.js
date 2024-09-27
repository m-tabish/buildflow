const { openai } = require('@ai-sdk/openai');
const { CoreMessage, streamText } = require('ai');
const dotenv = require('dotenv');
const readline = require('node:readline/promises');

dotenv.config();

const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const messages = [];

async function main() {
    while (true) {
        const str = `Generate a detailed step-by-step guide for creating a in   The description is as follows . 
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
  Provide comprehensive details for building , including any relevant code snippets.
  {
    "projectname": "movie-recommendation-app",
    "projectDescription": "A platform that suggests movies to users based on their preferences, genres, and ratings, allowing users to create watchlists and share reviews.",
    "language": "javascript"
}`;
        const userInput = await terminal.question(`You: ${str}  `);

        messages.push({ role: 'user', content: userInput });

        const result = await streamText({
            model: openai('gpt-4-turbo'),
            system: `You are a professional , highly experienced Software Developer.`,
            messages,
        });

        let fullResponse = '';
        process.stdout.write('\nAssistant: ');
        for await (const delta of result.textStream) {
            fullResponse += delta;
            process.stdout.write(delta);
        }
        process.stdout.write('\n\n');

        messages.push({ role: 'assistant', content: fullResponse });
    }
}

main().catch(console.error);
