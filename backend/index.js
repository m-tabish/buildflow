const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;
const { generateContent } = require("./gemini/index");
const { Project } = require("./db/mongo");
const e = require("cors");
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '10mb' })); // Adjust '10mb' as needed
require('dotenv').config();

app.get("/", (req, res) => {
    console.log("home");
    res.send("hello ");
});

app.get('/api', (req, res) => {
    res.json({ message: 'CORS is enabled for all origins!' });
});


//------------------------------GenAI API-----------------------------------------//

app.post("/create-project", async (req, res) => {
    try {
        // Generate content using your GenAI API
        const result = await generateContent(req.body);

        // Parse the response
        const response = JSON.parse(result);

        var { projectName, projectDescription, language } = req.body;
        const technologies = response.technologies;
        projectDescription = response.description;
        const steps = response.steps;

        // console.log(JSON.stringify(response));

        // Create the project with all necessary fields
        const project = await Project.create({ projectName, technologies, projectDescription, language, steps });
        res.status(201).json(project);
    } catch (e) {
        res.status(500).send({ msg: "Response not generated server index :" + e });
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

//---------------------------DELETE----------------------------------
app.delete('/delete-project/:id', async (req, res) => {
    try {
        const id = req.params["id"];

        // Find and delete the item by ID
        const deletedItem = await Project.findOneAndDelete({ _id: id });

        if (!deletedItem) {
            // Return early to avoid multiple response attempts
            return res.json({ msg: "Item not found" })
        }

        // If item is found and deleted, send success response
        return res.json({ message: 'Item deleted successfully', item: deletedItem });
    } catch (error) {
        // Handle any unexpected errors
        return res.sendStatus(500).json({ message: 'Server error', error });
    }
});

//---------------------------------LISTEN---------------------------------------//

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
// module.exports = app;
