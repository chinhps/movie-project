import * as z from "zod";

export const LoginSchema = z.object({
    username: z.string().min(4),
    password: z.string().min(5),
    // remember: z.boolean()
})

export const CommentSchema = z.object({
    message: z.string().min(1).max(5000)
})