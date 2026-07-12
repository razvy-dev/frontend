"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { signUpSchema, SignUpFormData } from '@/schemas/users/signup'

import TextField from "@/components/inputs/TextField";
import Password from "@/components/inputs/Password";
import AuthSubmit from "@/components/buttons/AuthSubmit";
import { useUserStore } from "@/stores/userStore";
import { redirect } from 'next/navigation'

export default function SignUp() {
    const setUser = useUserStore((state) => state.setUser)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        mode: "onTouched",
    });

    const onSubmit = async (data: SignUpFormData) => {
        try {
            const response = await axios.post("/api/auth/sign-up", data);
        
            const newCreatedUser = response.data; 
            
            setUser(newCreatedUser); 

            redirect('account')
        } catch(error) {
            console.log("Something went wrong", error)
        }
    }
    
    return (
        <div className='md:h-screen bg-white flex flex-col justify-center items-center gap-10'>
            <h2 className="text-2xl text-black font-bold">Create a new account</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                {/* Username */}
                <TextField 
                    type="text" 
                    label="Username" 
                    placeholder="username" 
                    register={register("username")} 
                    errors={errors.username} 
                />

                {/* Email */}
                <TextField 
                    type="text" 
                    label="Email" 
                    placeholder="email@example.com" 
                    register={register("email")} 
                    errors={errors.email} 
                />

                {/* Password (custom component for complexity validation) */}
                <Password 
                    label="Password" 
                    placeholder="password" 
                    register={register("password")} 
                    errors={errors.password} 
                />

                {/* Confirm Password */}
                <TextField 
                    type="password" 
                    label="Confirm Password" 
                    placeholder="password" 
                    register={register("confirmPassword")} 
                    errors={errors.confirmPassword} 
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