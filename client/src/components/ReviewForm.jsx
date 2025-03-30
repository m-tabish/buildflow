import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";

// Define validation schema
const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
});

export function ReviewForm() {
    // Initialize form
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            review: "",
            projectGenerated: "",
        },
    });

    // Submit handler
    function onSubmit(values) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <h1 className="font-bold text-center text-2xl text-[#f012be]">Review/Feedback Form</h1>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold text-black">1. Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Will not be shared with anyone." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold text-black">2. Project you generated</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Your valuable feedback." {...field} />
                            </FormControl>
                            <FormDescription>

                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
