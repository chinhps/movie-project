import * as z from "zod";

export const LoginSchema = z.object({
    username: z.string().min(4),
    password: z.string().min(5),
    // remember: z.boolean()
})

export const RegisterSchema = z.object({
    username: z.string().min(4),
    password: z.string().min(5),
    confirmPassword: z.string().min(5),
}).refine(
    (values) => {
        return values.password === values.confirmPassword;
    },
    {
        message: "Xác nhận mật khẩu không khớp!",
        path: ["confirmPassword"],
    }
);

export const CommentSchema = z.object({
    message: z.string().min(1).max(5000)
})

export const ChangePasswordSchema = z.object({
    current_password: z.string().min(5),
    password: z.string().min(5),
    confirmPassword: z.string().min(5),
}).refine(
    (values) => {
        return values.password === values.confirmPassword;
    },
    {
        message: "Xác nhận mật khẩu không khớp!",
        path: ["confirmPassword"],
    }
);

export const CreateCategorySchema = z.object({
    name: z.string().min(1).max(5000),
    description: z.string()
})

export const CreateMovieSchema = z.object({
    name: z.string().min(1).max(5000),
    description: z.string()
})
