import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import { NavLink } from "react-router-dom"

export default function Custom404() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
            <div className="space-y-4 text-center">
                <h2 className="text-4xl font-bold ">Some Error Occurred</h2>
                <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                    Sorry, we couldn&apos;t find the page you&#39;re looking for. It might have been removed, renamed, or doesn&apos;t exist.
                </p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button asChild>
                    <NavLink to="/">
                        <Home className="mr-2 h-4 w-4" />
                        Back to Home
                    </NavLink>
                </Button>
            </div>
        </div>
    )
}