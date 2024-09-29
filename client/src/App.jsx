/* eslint-disable no-unused-vars */
import axios from "axios";
import { ArrowDown, Loader2, SquareArrowOutUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import bg from "./assets/bg-black-bg.png";
import AllProjects from "./components/AllProjects";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { addProject } from "./slices/projectSlice";
import Socials from "./components/Socials";
function App() {
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




  // Fetches all the projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await axios.get(`${serverURL}/projects`);
        setProjects(projectsData.data);

      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, [input, loading, generation, serverURL]);


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
        console.log("Sending post request");
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
        console.error("Post request not sent", e);
      }
    }
  };

  return (
    <div className={`h-screen bg-cover bg-fixed bg-center bg-black/10 text-white overflow-none  shadow-none  bg-no-repeat  overflow-x-hidden`}>
      <Socials className={"absolute z-10 top-1/2"} />
      <div className="fixed -z-20 inset-0 bg-cover bg-center " style={{ backgroundImage: `url(${bg})`, backgroundBlendMode: 'hard-light', opacity: "90%" }}></div>
      <div className=' h-screen flex flex-col  min-w-screen justify-center items-center overflow-visible overscroll-contain'>
        <div className="flex flex-col gap-3 scroll-my-0">
          <div className='text-center flex flex-col  text-black   tracking-wider mb-10 flex-wrap  items-center'>
            <a className="hover:underline   text-black  font-extrabold   flex items-center gap-2 z-10 text-3xl " href="https://x.com/papayafruit123/status/1837139124136083574?t=TumFqAzfBhk4ZnT5EgL5tA&s=19" target="_blank" rel="noopener noreferrer">BUILD FLOW by Team TroGEN <SquareArrowOutUpRight size={"1rem"} /></a>
            <div className="text-2xl font-semibold  text-white/80">Generate Roadmaps for your next project.</div>
            <div className="text-base font-semibold  text-black">Scroll down to see latest roadmaps</div>
          </div>
          <form onSubmit={handleSubmit} className='flex flex-col w-3/4 m-auto p-auto gap-3'>
            <span className="flex flex-col gap-2">
              <label className="text-lg w-auto font-bold ">Project Name</label>
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
                className='  text-black  outline-none     bg-white/90 placeholder:text-black/30'
                onChange={(e) => setInput({ ...input, projectDescription: e.target.value })}
                placeholder="Description of your project"
                value={input.projectDescription}
                required
                minLength={1}
              />
            </span>
            <span className="flex flex-col gap-2">
              <label className="text-lg font-bold  ">Language and Frameworks</label>
              <Input
                type="text"
                className='  text-black outline-none focus:ring-0 bg-white/90 placeholder:text-black/30 border-none'
                onChange={(e) => setInput({ ...input, language: e.target.value })}
                placeholder="Javascript..."
                value={input.language}
                required
                minLength={1}
              />
              <Button
                type='submit'
                className=' bg-transparent  shadow-lg hover:bg-pink-200 hover:text-purple-600 shadow-purple-600 text-2xl font-bold text-white p-1  mt-10 '
                variant="outline"
              >

                {loading ?
                  (<Loader2 className="mr-2 h-4 w-4 animate-spin " />) :
                  (
                    'Submit'
                  )}
              </Button>
              {generation === "failed" ? (<div className="text-red-600 font-semibold w-full text-sm text-center"> Error Generating content kindly try again.</div>) : generation === "success" ?
                (<div className="text-green-600 font-semibold w-full text-sm text-center"> Successfully Generated your roadmap. Scroll to find it.</div>) : (<div className="text-white font-semibold w-full text-sm text-center">Click to Generate</div>)}

            </span>
          </form>
        </div>
      </div >




      {/* Showing all the projects made till now  */}

      <div className="  w-full text-center text-4xl mt-[10%] font-mono text-black/80">Check out some samples below   <ArrowDown className="hover:translate-y-3 inline" /></div>


      {projects ? ((projects.reverse()).map((project, index) => (
        <AllProjects className={" relative  z-50 "} project={project} key={project._id} />
      ))) : (<div>No projects found</div>)}


    </div >
  );
}

export default App;
