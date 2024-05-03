import NextAuth from "next-auth"
import { IUserAuth } from "./response/auth.type"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: IUserAuth
    }

    export interface User extends IUserAuth {}

}