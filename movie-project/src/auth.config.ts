import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import authApi from "./apis/auth";
import { LoginSchema } from "./schemas";

export default {
    providers: [
        Credentials({
            authorize: async (credentials) => {
                const validatedFields = LoginSchema.safeParse(credentials)
                if (validatedFields.success) {
                    const { username, password } = validatedFields.data;
                    try {
                        const user = await authApi.login(username, password);
                        return {...user.data.user, image45: "tjtyjykuhwefuwef"};
                    } catch (e) {
                        throw new Error("loi o auth config");
                    }
                }
                return null;
            }
        })
    ],
    session: { strategy: "jwt" },
} satisfies NextAuthConfig