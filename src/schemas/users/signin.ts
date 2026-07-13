import  { z } from 'zod'

export const signInSchema = z.object({
    username: z.string()
        .min(3, "Username must be at least 3 characters long")
        .regex(/^[0-9a-z\-.]+$/, "Username can only contain numbers, lowercase letters, hyphens (-), and dots (.)"),
    email: z.email("Please provide a valid email address"),
    password: z.string()
        .min(8, "Password must be at least 8 characters long")
})

export type SignInFormData = z.infer<typeof signInSchema>