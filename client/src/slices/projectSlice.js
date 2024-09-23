/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInput: {
        project: "Tic tac toe game",
        language: "Python"
    }
};

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        addProject: (state, action) => {
            // Directly update state.userInput
            state.userInput.project = action.payload.project;
            state.userInput.language = action.payload.language;
        }
    }
});

export const { addProject } = projectSlice.actions;
export default projectSlice.reducer;
