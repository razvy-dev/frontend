import { z } from 'zod'

export const signUpSchema = z.object({
    username: z.string()
        .min(3, "Your username needs to be at least 3 characters.")
        .regex(/^[0-9a-z\-.]+$/, "Username can only contain numbers, lowercase letters, hyphens (-), and dots (.)"),
    email: z.email("You need to type in a valid email."),
    password: z.string()
        .min(8, "The password needs to be at least 8 characters")
        .max(120, "The password can't be longer than 120 characters")
        .refine((val) => /[A-Z]/.test(val), "Password must contain at least one uppercase letter")
        .refine((val) => /[0-9]/.test(val), "Password must contain at least one number")
        .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), "Password must contain at least one special character"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type SignUpFormData = z.infer<typeof signUpSchema>;