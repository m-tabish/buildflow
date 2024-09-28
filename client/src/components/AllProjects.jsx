/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { viewProject } from "@/slices/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";





function AllProjects({ className, project }) {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const view = useSelector(state => state.viewProject)
    function clickedView(id) {
        dispatch(viewProject(id))
        navigate("/map/" + id)
    }

    return (
        <Card className={`${className} bg-transparent w-screen flex p-4 rounded  outline-none  border-none  `}  >
            <CardHeader className="w-1/2 text-right flex  ">
                <CardTitle className=" text-lg flex flex-col  font-semibold  border-none outline-none">{project.projectname}
                    <div className="flex-end gap-2">
                        {project.language.trim().split(",").map((lang, index) => {
                            return (
                                <Badge
                                    key={index}
                                    variant={"outline"}
                                    className="self-end text-sm w-fit items-center border-black"
                                >
                                    {lang.trim()}
                                </Badge>
                            );
                        })}
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="w-full  flex flex-grow items-center font-sans">
                <p>{project.projectDescription}</p>
            </CardContent>
            <CardFooter className="w-1/3 ">
                <Button onClick={() => clickedView(project._id)}>View</Button>
            </CardFooter>
        </Card >
    )
}
export default AllProjects
