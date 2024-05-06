import { CredentialsSignin, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import authApi from "./apis/auth";
import { LoginSchema } from "./schemas";
class CustomAuthorizeError extends CredentialsSignin {
    code = "custom"
}

export default {
    providers: [
        Credentials({
            authorize: async (credentials, request) => {
                const validatedFields = LoginSchema.safeParse(credentials)
                if (validatedFields.success) {
                    const { username, password } = validatedFields.data;
                    try {
                        const user = await authApi.login(username, password);
                        return { ...user.data.user, token: user.data.token };
                    } catch (e) {
                        throw new CustomAuthorizeError("oat the fucking shit");
                    }
                }
                return null;
            }
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                return {
                    ...token,
                    level: user.level,
                    username: user.username,
                    providerId: user.providerId,
                    token: user.token
                }
            }
            return token;
        },
        session: async ({ session, token }) => {
            if (token && session.user) {
                session.user = {
                    ...session.user,
                    level: token.level as number,
                    username: token.username as string,
                    providerId: token.providerId as string,
                    created_at: token.created_at as string,
                    token: token.token as string
                }
            }
            return session;
        }
    },
    session: { strategy: "jwt" },
} satisfies NextAuthConfig