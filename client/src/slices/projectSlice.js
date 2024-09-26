/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    userInput: {
        projectname: "",
        projectDescription: "",
        language: ""
    },
    viewProject: "ID 12345"
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
        }
    }
});

export const { addProject, viewProject } = projectSlice.actions;
export default projectSlice.reducer;
