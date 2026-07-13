import AuthSubmit from "@/components/buttons/AuthSubmit";
import { ResetPasswordFormData, resetPasswordSchema } from "@/schemas/users/resetPassword";
import { useUserStore } from "@/stores/userStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import Password from "@/components/inputs/Password";
import TextField from "@/components/inputs/TextField";
import axios from "axios"
import { redirect } from 'next/navigation'

export default function ResetPassword() {
    const setUser = useUserStore((state) => state.setUser)
    const isLoading = useUserStore((state) => state.isLoading)

    const tokenParams = useSearchParams()
    const token = tokenParams.get("token")

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
        mode: "onTouched"
    });

    const onSubmit = async (data: ResetPasswordFormData) => {
        try {
            // add the token to the request

            data.token = token; // ! fix this
            const response = await axios.post("/api/auth/reset-password", data)

            const user = response.data

            setUser(user)

            redirect('account')
        } catch (error) {
            console.log("Something went wrong", error)
        }
    }

    // ** So, I am not checking the token as soon as the user gets on this page
    // ** because I can actually check it when the user also send in the new password

    return (
        <div className='md:h-screen bg-white flex flex-col justify-center items-center gap-10'>
            <h2 className="text-2xl text-black font-bold">Create a new account</h2>
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

            <AuthSubmit
                content={"Change Password"}
                isSubmitting={isSubmitting}
                contentWhileSubmitting={"Changing your passowrd"}
            />
        </div>
    )
}