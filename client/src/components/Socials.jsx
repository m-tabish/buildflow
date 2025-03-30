/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Avatar } from "@/components/ui/avatar"

import { Github, Linkedin, Twitter, UserRound } from "lucide-react"
function Socials({ className }) {
    const avatarClass = "flex justify-center items-center rounded-full"
    return (
        <div className={`${className} z-10 sm:w-fit w-[2em] place-items-start text-black `}>
            <Avatar className={`${avatarClass}`}>
                <a href="https://www.x.com/damnthesebugs" target="_blank"><Twitter /></a>
            </Avatar>
            <Avatar className={`${avatarClass}`}>
                <a href="https://www.linkedin.com/in/m-tabishk/" target="_blank"><Linkedin /></a>
            </Avatar>
            <Avatar className={`${avatarClass}`}>
                <a href="https://github.com/m-tabish/buildflow" target="_blank"><Github /></a>

            </Avatar>
            <Avatar className={`${avatarClass}`}>
                <a href="https://www.tabishcodes.me/" target="_blank"><UserRound /></a>

            </Avatar>
        </div >
    )
}

export default Socials
