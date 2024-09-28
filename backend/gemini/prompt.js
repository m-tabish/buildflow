const prompt = `

Requirements:

- Each node should have a unique nodeId.
- Keep the response according to your free generation limit so that and don't give half responses.
- Keep the response within your generation limit.
- The source and target fields in the edges should specify the connections between nodes.
- The structure should form a non-linear roadmap.
- The response should be valid JSON that can be parsed without errors.
- Give the most elaborate steps you can generate. 
- Do not just give an overview of the steps like create backend. 
- Have a main branch in middle and then leaf branches around it.
- Additional notes:
  - The label field in the edges can be used to describe the relationship between the connected nodes.
  - For a non-linear roadmap, consider using multiple target nodes for some nodes to create branches and parallel paths.

`;


// { 
//    {   
//       "technologies": ["<All the full stack technologies/frameworks that can be used according to the language>"]
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
