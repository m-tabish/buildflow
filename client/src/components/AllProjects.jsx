/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { viewProject } from "@/slices/projectSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
function AllProjects({ project }) {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const view = useSelector(state => state.viewProject)
    function clickedView(id) {
        dispatch(viewProject(id))
        navigate("/map/" + id)
    }

    useEffect(() => {
        console.log("View Project State Updated:", view);
    }, [view]);
    return (
        <Card className="w-screen flex p-4 rounded outline-none border-none ">
            <CardHeader className="w-1/2 text-right flex gap-2">
                <CardTitle className=" text-lg flex flex-col  font-semibold gap-2">{project.projectname}
                    {project.language.trim().split(",").map((lang, index) => {
                        return (
                            <Badge
                                key={index}
                                variant={"outline"}
                                className="self-end text-sm w-fit outline outline-[0.2px] outline-slate-150 items-center"
                            >
                                {lang.trim()}
                            </Badge>
                        );
                    })}
                </CardTitle>
            </CardHeader>
            <CardContent className="w-full  flex flex-grow items-center font-sans">
                <p>{project.projectDescription}</p>
            </CardContent>
            <CardFooter className="w-1/3 ">
                <Button onClick={() => clickedView(project._id)}>View</Button>
            </CardFooter>
        </Card>
    )
}
export default AllProjects
