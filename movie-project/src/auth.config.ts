import { CredentialsSignin, Session, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import authApi from "./apis/auth";
import { LoginSchema } from "./schemas";
import { JWT } from "next-auth/jwt";
import { userApi } from "./apis/user";
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
        jwt: async ({ token, user, trigger }) => {
            if (trigger === "update" && token.token) {
                const { data: newInfo } = await userApi.info(token.token);
                if (typeof newInfo.name !== "undefined") {
                    token.name = newInfo.name;
                    token.avatar_url = newInfo.avatar_url;
                }
            }

            if (user) {
                return {
                    ...token,
                    level: user.level,
                    username: user.username,
                    providerId: user.providerId,
                    token: user.token,
                    role: user.role,
                    avatar_url: user.avatar_url
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
                    role: token.role,
                    avatar_url: token.avatar_url
                }
            }
            return session;
        }
    },
    session: { strategy: "jwt" },
    trustHost: true
} satisfies NextAuthConfig