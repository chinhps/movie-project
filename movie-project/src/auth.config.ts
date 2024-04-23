import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import authApi from "./apis/auth"
import { LoginSchema } from "./schemas"

export default {
    providers: [
        Credentials({
            authorize: async (credentials) => {
                const validatedFields = LoginSchema.safeParse(credentials)

                if (validatedFields.success) {
                    const { username, password } = validatedFields.data;
                    const user = await authApi.login(username, password);
                }
            }
        })
    ],
    session: { strategy: "jwt" },
} satisfies NextAuthConfig