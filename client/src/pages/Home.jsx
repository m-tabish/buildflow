/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProject } from "../slices/projectSlice";

function Home() {
    const userInput = useSelector(state => state.userInput); // Adjusted to match the state structure
    const [input, setInput] = useState({
        project: "tic", // Default value
        language: "python" // Default value
    });
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Dispatching the addProject action with the current input
        dispatch(addProject({
            project: input.project,
            language: input.language
        }));
        // Reset input fields
        setInput({
            project: "",
            language: "python" // Resetting language to default
        });
    };

    return (
        <div className='border h-auto p-2 gap-2 flex flex-col'>
            <label className='text-3xl'>Enter project</label>
            <form onSubmit={handleSubmit} className='flex gap-2'>
                <input
                    type="text"
                    className='border border-black'
                    value={input.project}
                    onChange={(e) => setInput({ ...input, project: e.target.value })}
                    placeholder="Project Name"
                />
                <select
                    name="languages"
                    value={input.language} // Controlled component
                    onChange={(e) => setInput({ ...input, language: e.target.value })} // Correctly updating state
                >
                    <option value="Python">Python</option>
                    <option value="Java">Java</option>
                    <option value="C++">C++</option>
                </select>
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
