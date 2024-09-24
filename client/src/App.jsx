/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProject } from "./slices/projectSlice";
function App() {
  const userInput = useSelector(state => state.userInput);
  const [input, setInput] = useState({
    project: "",
    language: ""
  });
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    if (input) {
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
      //navigate to the generated map
      if(input)
      //----------------------0 implemente if the page loaded then map else loading---------------------------------
      navigate("/map")

    }
    else {
      console.alert("No response")
    }
  };

  //sending the user input to the GenAI API using post method
  async function postInput(input) {
    try {
      console.log("sending post req");
      const response = await axios.post("http://localhost:3000/create-project", {
        projectname: input.project,
        language: input.language
      })
      console.log("post success", response.data._id)
    }
    catch (e) {
      console.error("Post request not sent", e)
    }
  }

  return (
    <div className='   border  flex  border-black min-w-screen min-h-screen justify-center items-center'>
      <div className="flex flex-col gap-2">
        <label className='text-3xl text-center  font-serif '>Enter project</label>
        <form onSubmit={handleSubmit} className=' flex flex-col  gap-2'
        >
          <textarea
            type="text"
            className='border border-black'

            value={input.project}
            onChange={(e) => setInput({ ...input, project: e.target.value })}
            placeholder="Explain your idea here"
            required
            minLength={10}

          />
          <input type="text"
            className="border border-black"
            onChange={(e) => setInput({ ...input, language: e.target.value })}
            placeholder="Languages,Frameworks "
            required
            defaultValue={""}
            minLength={1} />

          <button
            type='submit'
            className='border border-black bg-red-400 text-2xl font-bold text-white p-1 shadow-lg'

          >
            Submit
          </button>
        </form>
        <div className="flex-1">Project: {userInput.project || "No project added"} , Language: {userInput.language || "None"}</div>

      </div>
    </div>
  );
}

export default App;
