/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import bg from "../assets/bg-03.jpg"
function Socials({ className }) {
    return (
        <div className={`${className} text-black `}>
            <Avatar>
                <AvatarImage src={bg} />
                <AvatarFallback>X</AvatarFallback>
            </Avatar>
            <Avatar>
                <AvatarImage src="\https://www.linkedin.com/in/m-tabishk/" />
                <AvatarFallback>LI</AvatarFallback>
            </Avatar>
            <Avatar>
                <AvatarImage src="https://github.com/m-tabish" />
                <AvatarFallback>GH</AvatarFallback>
            </Avatar>
        </div>
    )
}

export default Socials
