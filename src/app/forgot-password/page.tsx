"use client"

import { ForgotPasswordData, forgotPasswordSchema } from "@/schemas/users/forgotPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios"
import TextField from "@/components/inputs/TextField";
import AuthSubmit from "@/components/buttons/AuthSubmit";

export default function SignUp() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<ForgotPasswordData>({
        resolver: zodResolver(forgotPasswordSchema),
        mode: "onTouched"
    })

    const onSubmit = async (data: ForgotPasswordData) => {
        try {
            const response = await axios.post("/api/auth/forgot-password", data)

            if (response.status == 401) {
                console.log("You're code might have expired. Try again!")
            } else if (response.status == 429) {
                console.log("You made too many requests. Wail and try again later.")
            } else if (response.status == 500) {
                console.log("Something went wrong")
            }
        } catch (error) {
            console.log("Something went wrong", error)
        }
    }

    return (
        <div className='md:h-screen bg-white flex flex-col justify-center items-center gap-10'>
            <h2 className="text-2xl text-black font-bold">Create a new account</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                {/* Email field */}
                <TextField
                    type="email"
                    label="Email"
                    placeholder="email"
                    register={register("email")}
                    errors={errors.email}
                />
                
                <AuthSubmit
                    content="Send recovery email"
                    isSubmitting={isSubmitting}
                    contentWhileSubmitting="Sending..."
                />
            </form>
        </div>
    )
}