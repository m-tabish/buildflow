/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInput: {
        projectname: "",
        projectDescription: "",
        language: ""
    },
    viewProject: "ID 12345",
    serverURL: "https://buildflow-backend.up.railway.app"
    // serverURL: "http://localhost:3000"  
    // deployed_serverURL: "https://buildflow-backend.up.railway.app"

};

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        addProject: (state, action) => {
            // Directly update state.userInput
            state.userInput.project = action.payload.project;
            state.userInput.projectDescription = action.payload.projectDescription;
            state.userInput.language = action.payload.language;
        },
        viewProject: (state, action) => {
            state.viewProject = action.payload
        },
        colorModeGlobal: (state, action) => {
            state.colorModeGlobal = action.payload
        }
    }
});

export const { addProject, viewProject, colorModeGlobal } = projectSlice.actions;
export default projectSlice.reducer;
