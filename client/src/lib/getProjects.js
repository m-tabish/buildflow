import axios from "axios"
export async function getProjects() {
    const response = await axios.get("http://localhost:3000/projects")
    return response 
}