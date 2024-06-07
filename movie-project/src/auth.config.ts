import { CredentialsSignin, Session, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import authApi from "./apis/auth";
import { LoginSchema } from "./schemas";
import { JWT } from "next-auth/jwt";
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
                    token: user.token,
                    role: user.role
                }
            }
            return token;
        },
        session: async ({ session, token }: { session: Session, token: JWT }) => {
            if (token && session.user) {
                session.user = {
                    ...session.user,
                    level: token.level,
                    username: token.username,
                    providerId: token.providerId,
                    created_at: token.created_at,
                    token: token.token,
                    role: token.role
                }
            }
            return session;
        }
    },
    session: { strategy: "jwt" },
    trustHost: true
} satisfies NextAuthConfig