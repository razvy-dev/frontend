import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/src/index.js";
import axios from "axios";

import { signInSchema, SignInFormData } from '@/schemas/users/signin'

import TextField from "@/components/inputs/TextField";
import AuthSubmit from "@/components/buttons/AuthSubmit";
import { useUserStore } from "@/stores/userStore";
import { redirect } from 'next/navigation'

export default function SignIn() {
    const setUser = useUserStore((state) => state.setUser)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
        mode: "onTouched",
    });

    const onSubmit = async (data: SignInFormData) => {
        try {
            const response = await axios.post("/api/auth/sign-in", data)

            const userData = response.data

            setUser(userData)
        } catch (error) {
            console.log("Something went wrong, error")
        }
    }

    return (
        <div className='md:h-screen bg-white flex flex-col justify-center items-center gap-10'>
            <h2 className="text-2xl text-black font-bold">Sign into your account</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                {/* Username/Email */}
                <TextField 
                    type="text" 
                    label="Username or Email" 
                    placeholder="Username or Email" 
                    register={register("username")} 
                    errors={errors.username} 
                />

                {/* Password */}
                <TextField 
                    type="text" 
                    label="Email" 
                    placeholder="email@example.com" 
                    register={register("email")} 
                    errors={errors.email} 
                />

                {/* Submit */}
                <AuthSubmit 
                    content={"Submit"} 
                    isSubmitting={isSubmitting} 
                    contentWhileSubmitting={"Creating an account..."} 
                />
                
            </form> 
        </div>
    )
}