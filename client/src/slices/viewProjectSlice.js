
import { createSlice } from "@reduxjs/toolkit";

const viewProjectSlice = createSlice({
    name: "viewProject",
    initialState: "ID 1234",
    reducers: {
        viewProject: (state, action) => {
            state.viewProject = action.payload.viewProject
        }
    }
})

export const { viewProject } = viewProjectSlice.actions
export default viewProjectSlice.reducer