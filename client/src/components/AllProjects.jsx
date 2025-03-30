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
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

function AllProjects({ deleteFunction, className, project }) {
    const serverURL = useSelector(state => state.serverURL)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const view = useSelector(state => state.viewProject)
    const [deleteId, setDeleteId] = useState("")

    function clickedView(id) {
        dispatch(viewProject(id))
        navigate("/map/" + id)
    }

    useEffect(() => {

        if (deleteId) {
            const performDelete = async () => {
                const result = await axios.delete(`${serverURL}/delete-project/${deleteId}`)
                if (result) {
                    setDeleteId("")
                    return "Item deleted Succesfully"
                }
                else {
                    return "Item could not be deleted"
                }
            }

            performDelete()
        }
    }, [deleteId, setDeleteId])

    return (
        <Card className={`${className} bg-transparent w-screen flex p-4 rounded  outline-none  border-none  `}  >
            <CardHeader className="w-1/2 text-right flex  ">
                <CardTitle className=" text-lg flex flex-col gap-2 font-semibold  border-none outline-none">{project.projectname}
                    <div className="flex-end  ">
                        {project.technologies && project.technologies.map((lang, index) => {
                            return (
                                <Badge
                                    key={index}
                                    variant={"outline"}
                                    className="self-end ml-1 text-xs w-fit items-center border-black"
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
            <CardFooter className="w-1/3 gap-2 ">
                <Button onClick={() => clickedView(project._id)}>View</Button>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSfPaKwDIXYElN8y62tHemR1Y6qJODqNN087dPEApgNJtCrXdw/viewform?usp=sharing" target='_blank' className='flex-col flex items-center' ><Button >Feedback</Button></a>

                {/* <Button variant={"outline"} onClick={() => deleteProject(project._id)}><Trash2 /></Button> */}
            </CardFooter>
        </Card >
    )
}
export default AllProjects
