/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AllProjects from "./components/AllProjects";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { addProject } from "./slices/projectSlice";

function App() {
  // Stores all the projects made till now 
  const [projects, setProjects] = useState([]);

  // Fetches all the projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log("useEffect running");
        const projectsData = await axios.get("http://localhost:3000/projects");
        setProjects(projectsData.data); // Setting the fetched projects to state
        console.log(projectsData.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const userInput = useSelector(state => state.userInput);
  const [input, setInput] = useState({
    project: "",
    projectDescription: "",
    language: ""
  });
  const [errorGenerating, setErrorGenerating] = useState(false)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setErrorGenerating(false)
    e.preventDefault();
    if (input.project && input.projectDescription && input.language) {
      // Dispatching the addProject action with the current input
      dispatch(addProject({
        project: input.project,
        projectDescription: input.projectDescription,
        language: input.language
      }));

      // Sending the user input to the GenAI API using post method
      try {
        console.log("Sending post request");
        const response = await axios.post("http://localhost:3000/create-project", {
          projectname: input.project,
          projectDescription: input.projectDescription,
          language: input.language
        });
        console.log("Post success", response.data._id);
        setInput({
          project: "",
          projectDescription: "",
          language: ""
        });
      } catch (e) {
        setErrorGenerating(true)
        console.error("Post request not sent", e);
      }

      // Reset input fields
    }
  };

  return (
    <div className="h-screen">
      <div className='h-screen flex flex-col border-black min-w-screen justify-center items-center overflow-visible overscroll-contain'>
        <div className="flex flex-col gap-2 scroll-my-0">
          <label className='text-3xl text-center   font-mono'>Enter project</label>
          <form onSubmit={handleSubmit} className='flex flex-col w-[300px] m-auto p-auto gap-2'>
            <Input
              type="text"
              className='border border-black'
              value={input.project}
              onChange={(e) => setInput({ ...input, project: e.target.value })}
              placeholder="Project Name"
              required
              minLength={10}
            />
            <Textarea
              type="text"
              className="border border-black"
              onChange={(e) => setInput({ ...input, projectDescription: e.target.value })}
              placeholder="Description of your project"
              value={input.projectDescription}
              required
              minLength={1}
            />
            <Input
              type="text"
              className="border border-black"
              onChange={(e) => setInput({ ...input, language: e.target.value })}
              placeholder="Languages, Frameworks"
              value={input.language}
              required
              minLength={1}
            />
            <Button
              type='submit'
              className='border border-black text-2xl font-bold text-white p-1 shadow-lg'
            >
              Submit
            </Button>
            {errorGenerating && <div className="text-red-600"> Error Generating content kindly try again.</div>}
          </form>


        </div>
        <div className="w-full text-center text-4xl mt-52 font-mono text-black">Check out some samples below
         ⬇️</div>
      </div >
      <div className=" "> 
        {projects && projects.map(project => (
          <AllProjects project={project} key={project._id} />
        ))}
      </div>

      {/* <div className="h-[100px]"></div> */}
    </div >
  );
}

export default App;
