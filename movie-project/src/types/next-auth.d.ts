import NextAuth from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** The user's name. */
            name: string
            username: string
        }
    }

    export interface User {
        id?: string
        name?: string | null
        email?: string | null
        image45?: string | null
    }

}