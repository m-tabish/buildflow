/* eslint-disable no-unused-vars */
import { configureStore } from "@reduxjs/toolkit"
import projectReducer from "../slices/projectSlice.js" 
const store = configureStore({
   
    reducer: projectReducer

})
export default store 