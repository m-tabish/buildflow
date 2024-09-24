/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";
import { Textarea } from "./components/ui/textarea";
import { addProject } from "./slices/projectSlice";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


function App() {

  //stores all the projects made till now 
  const [projects, setProjects] = useState("")
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log("useeffect running");

        const projectsData = await axios.get("http://localhost:3000/projects");
        setProjects(projectsData.data); // Setting the fetched projects to state
        console.log(projects);


      } catch (error) {
        console.error("Error fetching projects:", error);
      }

    };
    fetchProjects()
  }, [setProjects])


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
      if (input)
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
      return response.data._id
    }
    catch (e) {
      console.error("Post request not sent", e)
    }
  }

  return (
    <div>
      <div className=' h-screen flex flex-col border-black min-w-screen min-h-screen justify-center items-center overflow-visible overscroll-contain  '>
        <div className="   flex flex-col gap-2  scroll-my-0">
          <label className='text-3xl text-center  font-serif '>Enter project</label>
          <form onSubmit={handleSubmit} className=' flex flex-col  gap-2'
          >
            <Textarea
              type="text"
              className='border border-black'
              value={input.project}
              onChange={(e) => setInput({ ...input, project: e.target.value })}
              placeholder="Explain your idea here"
              required
              minLength={10}

            />
            <Textarea type="text"
              className="border border-black"
              onChange={(e) => setInput({ ...input, language: e.target.value })}
              placeholder="Languages,Frameworks "
              required
              defaultValue={""}
              minLength={1} />

            <Button
              type='submit'
              className='border border-black text-2xl font-bold text-white p-1 shadow-lg'

            >
              Submit
            </Button>
          </form>
          <div className="flex-1">Project: {userInput.project || "No project added"} , Language: {userInput.language || "None"}</div>

        </div>
      </div>

      <Table >
        <div className="relative m-auto w-full flex flex-col items-center justify-center ">
          <TableCaption className="font-bold text-3xl text-black">Some of the projects created till now</TableCaption>
          <TableHeader className="">
            <TableRow>
              <TableHead className=" " >Project Idea</TableHead>
              <TableHead>Language/Framework</TableHead>

            </TableRow>
          </TableHeader>
          <TableBody>

            {projects && projects.map(project => {
              return (<TableRow key={project._id}  >
                <TableCell className="font-medium gap-48">{project.projectname.slice(0, 30)}</TableCell>
                <TableCell>{project.language}</TableCell>

              </TableRow>)
            })}

          </TableBody>
        </div>
      </Table>
    </div >
  );
}

export default App;
