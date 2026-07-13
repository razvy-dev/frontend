import { z } from "zod"

export const deleteAccountSchema = z.object({
    password: z.string()
        .min(8, "Password must be at least 8 characters long")
        .max(120, "Password must be at most 120 characters long")
})

export type DeleteAccountFormData = z.infer<typeof deleteAccountSchema>