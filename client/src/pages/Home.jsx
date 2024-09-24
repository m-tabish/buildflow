/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProject } from "../slices/projectSlice";
import axios from "axios"
function Home() {
    const userInput = useSelector(state => state.userInput);
    const [input, setInput] = useState({
        project: "",
        language: ""
    });
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Dispatching the addProject action with the current input
        dispatch(addProject({
            project: input.project,
            language: input.language
        }));

        //calling the function to post request to GenAI API
        postInput(input)
        // Reset input fields
        setInput({
            project: "",
            language: ""
        });
    };

    //sending the user input to the GenAI API using post method
    async function postInput(input) {
        try {
            console.log("sending post req");    
            const response= await axios.post("http://localhost:3000/create-project", {
                projectname: input.project,
                language: input.language
            })
            console.log("post success" ,  response.data._id)
        }
        catch (e) {
            console.error("Post request not sent", e)
        }
    }

    return (
        <div className='border h-auto p-2 gap-2 flex flex-col'>
            <label className='text-3xl'>Enter project</label>
            <form onSubmit={handleSubmit} className='flex gap-2'
             >
                <input
                    type="text"
                    className='border border-black'
                    value={input.project}
                    onChange={(e) => setInput({ ...input, project: e.target.value })}
                    placeholder="Project Name"
                    required
                    minLength={10}
                    
                />
                <input type="text"
                    className="border border-black"
                    onChange={(e) => setInput({ ...input, language: e.target.value })}
                    placeholder="Languages,Frameworks " />

                <button
                    type='submit'
                    className='border border-black bg-red-400 text-2xl font-bold text-white p-1'
                >
                    Submit
                </button>
            </form>
            <div className="flex-1">Project: {userInput.project || "No project added"} , Language: {userInput.language || "None"}</div>
        </div>
    );
}

export default Home;
