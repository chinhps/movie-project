"use server";

import { signIn } from '@/auth';
import { ADMIN_URL_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/schemas';
import { AuthError } from 'next-auth';
import * as z from 'zod';

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { message: 'error', type: 'error' }
    }
    console.log('login.ts', validatedFields);
    const { username, password } = validatedFields.data;
    try {
        await signIn("credentials", {
            username,
            password,
            redirectTo: ADMIN_URL_LOGIN_REDIRECT
        });
    } catch (e) {
        if (e instanceof AuthError) {
            switch (e.type) {
                case "CredentialsSignin":
                    return { message: 'invalid credential', type: 'error' };
                default:
                    return { message: 'something wrong', type: 'error' };
            }
        }
        throw e;
    }
}