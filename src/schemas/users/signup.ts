import { z } from 'zod'

export const signUpSchema = z.object({
    username: z.string().min(3, "Your username needs to be at least 3 characters."),
    email: z.string().email("You need to type in a valid email."),
    password: z.string()
        .min(8, "The password needs to be at least 8 characters")
        .max(120, "The password can't be longer than 120 characters"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type SignUpFormData = z.infer<typeof signUpSchema>;