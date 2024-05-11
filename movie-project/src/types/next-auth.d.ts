import NextAuth from "next-auth"
import { IUserAuth } from "./response/auth.type"

declare module "next-auth" {
    interface Session {
        user: IUserAuth
    }

    export interface User extends IUserAuth { }
}

declare module "next-auth/jwt" {
    interface JWT extends IUserAuth { }
}