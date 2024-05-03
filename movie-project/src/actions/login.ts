"use server";

import { signIn } from '@/auth';
import { DEFAULT_URL_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/schemas';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import * as z from 'zod';

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { message: 'error', type: 'error' }
    }
    const { username, password } = validatedFields.data;
    try {
        await signIn("credentials", {
            username,
            password,
            redirect: false
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { message: 'invalid credential', type: 'error' };
                default:
                    return { message: 'something wrong', type: 'error' };
            }
        }
        throw error;
    } finally {
        redirect(DEFAULT_URL_LOGIN_REDIRECT);
    }
}