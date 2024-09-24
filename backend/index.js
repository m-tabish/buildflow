const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;
const { generateContent } = require("./gemini/index");
const { Project } = require("./db/mongo")
require('dotenv').config();
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    console.log("home");
    res.send("hello");
});



//------------------------------GenAI API-----------------------------------------//

app.post("/create-project", async (req, res) => {
    try {
    //generateContent contains GenAI API function it returns the nodes,edges,steps in json
        const result = await generateContent(req.body);
        const { projectname, language } = req.body; 
        const steps = JSON.parse(result) 
        const project = await Project.create({ projectname, language, steps });
        res.status(201).json(project);
    } catch (e) {
        console.error("Error creating project:", e);
        res.status(500).send({ msg: "Response not generated" + e });
    }
});


//---------------------------------GET---------------------------------------//

app.get("/projects", async (req, res) => {
    try {
        const projects = await Project.find({})
        res.send(projects)
    }
    catch (e) {
        res.status(500).send({ msg: e })
    }
})



app.get("/projects/:id", async (req, res) => {
    try {
        const projectId = req.params['id']
        const project = await Project.find({ _id: projectId })
        if (project)
            res.send(project)
        else
            res.status(404).send("Not found")
    }
    catch (e) {
        res.status(500).send({ msg: e })
    }
})




//---------------------------------LISTEN---------------------------------------//

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
