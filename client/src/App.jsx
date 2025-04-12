/* eslint-disable no-unused-vars */
import { Analytics } from "@vercel/analytics/react";
import axios from "axios";
import countapi from "countapi-js";
import { ArrowDown, Loader2, SquareArrowOutUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import bg from "./assets/bg-black-bg.png";
import logo from "./assets/logo.png";
import AllProjects from "./components/AllProjects";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { addProject } from "./slices/projectSlice";
import Socials from "./components/Socials";

function App() {
  async function call_backend() {
    try {
      const resp = await axios.get("https://buildflow-backend.onrender.com/")
      console.log('backend hit', resp.data);
    }
    catch (e) {
      console.log(e)
    }

  }

  useEffect(() => {
    call_backend()
  }, [])

  // Stores all the projects made till now 
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState({
    project: "",
    projectDescription: "",
    language: ""
  });
  const [generation, setGeneration] = useState("")

  const dispatch = useDispatch();


  const serverURL = useSelector(state => state.serverURL)

  // console.log(serverURL);

  // Fetches all the projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await axios.get(`${serverURL}/projects`);
        // console.log(serverURL)

        setProjects(projectsData.data)
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, [loading, generation, serverURL]);


  //  Submit button function : Runs when submit is clicked
  const handleSubmit = async (e) => {
    setGeneration("")
    setLoading(false)
    e.preventDefault();
    if (input.project && input.projectDescription && input.language) {
      setLoading(true)
      // Dispatching the addProject action with the current input
      dispatch(addProject({
        project: input.project,
        projectDescription: input.projectDescription,
        language: input.language
      }));

      // Sending the user input to the GenAI API using post method
      try {

        const response = await axios.post(`${serverURL}/create-project`, {
          projectname: input.project,
          projectDescription: input.projectDescription,
          language: input.language
        });
        if (response) {
          setGeneration("success")
        }
        setLoading(false)
      } catch (e) {
        setGeneration("failed")
        setLoading(false)
        console.log("Post request not sent", e);
      }
    }
  };


  countapi.visits('global').then((result) => {
    console.log(result.value);
  });


  return (
    <div className={`h-screen  bg-cover bg-fixed  bg-center m-auto bg-black/10 text-white overflow-none  shadow-none  bg-no-repeat  overflow-x-hidden`}>
      <Analytics />
      <Socials className={'absolute top-1/3 bg-white rounded-sm'} />
      <p className="text-center  text-red-400 ">NOTE:Since the backend is hosted on a free tier on Render, it takes <span className="font-black text-[#f01200]">50 seconds</span> for the server to start.</p>

      <div className="fixed -z-20 inset-0 bg-cover bg-center " style={{ backgroundImage: `url(${bg})`, backgroundBlendMode: 'hard-light', opacity: "90%" }}>
      </div>
      <div className='h-screen flex flex-col  min-w-screen justify-center items-center overflow-visible overscroll-contain'>
        <div className="flex flex-col gap-3 scroll-my-0">
          <div className='text-center flex flex-col  text-black   tracking-wider mb-10 flex-wrap  items-center'>
            <a className="hover:underline  w-[300px] text-transparent h-24 mx-auto bg-center  font-extrabold  justify-between flex items-center gap-10 z-10 text-3xl " href="https://x.com/damnthesebugs/status/1840646848270492084" target="_blank" rel="noopener noreferrer " style={{ backgroundImage: `url(${logo})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}>
              <div> BUILD FLOW</div>
              <SquareArrowOutUpRight size={"1rem"} color="black" />
            </a>
            <div className="text-2xl font-semibold  text-white/80">Generate a Roadmap for your next project.</div>
            <div className="text-base font-semibold  text-black">Scroll down to see latest roadmaps <ArrowDown size={"1em"} className=" inline animate-bounce" />
            </div>
          </div>


          {/* Project Form  */}
          <form onSubmit={handleSubmit} className='flex flex-col w-3/4 m-auto p-auto gap-3'>
            <span className="flex flex-col gap-2">
              <label className="text-lg w-auto font-bold active:border ">Project Name</label>
              <Input
                type="text"
                className='  text-black outline-none  bg-white/90 placeholder:text-black/30
                  focus:outline-none active:outline-none active:ring-0 focus:ring-0'
                value={input.project}
                onChange={(e) => setInput({ ...input, project: e.target.value })}
                placeholder="Project Name"
                required
                minLength={1}

              /></span>
            <span className="flex flex-col gap-2">
              <label className="text-lg font-bold  ">Project Description</label>
              <Textarea
                type="text"
                className='  text-black  outline-none  active:border    bg-white/90 placeholder:text-black/30'
                onChange={(e) => setInput({ ...input, projectDescription: e.target.value })}
                placeholder="Description of your project"
                value={input.projectDescription}
                required
                minLength={1}
              />
            </span>
            <span className="flex flex-col gap-2 ">
              <label className="text-lg font-bold  ">Language and Frameworks</label>
              <Input
                type="text"
                className='  text-black outline-none  active:border focus:ring-0 bg-white/90 placeholder:text-black/30 border-none'
                onChange={(e) => setInput({ ...input, language: e.target.value })}
                placeholder="Javascript..."
                value={input.language}
                required
                minLength={1}
              />
              <Button
                type='submit'
                className=' bg-transparent    hover:border-1 hover:border-black  shadow-lg hover:bg-pink-200 hover:text-purple-600 shadow-purple-600 text-2xl font-bold text-white p-1  mt-10 '
                variant="outline"
              >

                {loading ?
                  (<Loader2 className="mr-2 h-4 w-4 animate-spin " />) :
                  (
                    'Submit'
                  )}
              </Button>
              {generation === "failed" ? (<div className="text-red-600 font-semibold w-full text-sm text-center"> Error Generating content. Please refresh the page and try again.</div>) : generation === "success" ?
                (<div className="text-teal-300  font-semibold w-full text-sm text-center"> Successfully Generated your roadmap. Scroll to find it.</div>) : (<div className="text-white font-semibold w-full text-sm text-center">Click to Generate</div>)}

            </span>
          </form>


        </div>

      </div >




      {/* Showing all the projects made till now  */}

      <div className="  w-full text-center text-4xl mt-[10%] font-mono text-black/80">Check out what people have made <ArrowDown className="hover:translate-y-3 inline animate-bounce" /></div>


      {projects ? ((projects.reverse()).map((project, index) => (
        <AllProjects className={" relative  z-50 "} project={project} key={project._id} />
      ))) : (<div>No projects found</div>)}


    </div >
  );
}

export default App;