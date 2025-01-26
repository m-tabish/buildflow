import { config } from "dotenv";
import mongoose from "mongoose";
config();

mongoose.connect(import.meta.env.VITE_CONNECTION_URL, {
    serverSelectionTimeoutMS: 30000 // 30 seconds
})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('Connection error', err));

const projectSchema = new mongoose.Schema({
    projectname: {
        type: String,
        required: true,
    },

    technologies: {
        type: [String],
        required: true
    },
    projectDescription: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true,
    },
    steps: {
        type: Object,
        required: true
    },

});

const Project = mongoose.model('Project', projectSchema);

export { Project }