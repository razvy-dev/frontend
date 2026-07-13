import { z } from 'zod'

export const resetPasswordSchema = z.object({
    currentPassword: z.string()
        .min(8, "The current password needs to be at least 8 characters")
        .max(120, "The current password can't be longer than 120 characters"),
    password: z.string()
        .min(8, "The password needs to be at least 8 characters")
        .max(120, "The password can't be longer than 120 characters")
        .refine((val) => /[A-Z]/.test(val), "Password must contain at least one uppercase letter")
        .refine((val) => /[0-9]/.test(val), "Password must contain at least one number")
        .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), "Password must contain at least one special character"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
})

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>