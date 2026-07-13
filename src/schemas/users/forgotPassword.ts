import { z } from 'zod'

export const forgotPasswordSchema = z.object({
    email: z.email("You need to type in a valid email."),
})