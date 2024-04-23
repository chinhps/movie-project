import authConfig from "@/auth.config";
import NextAuth from "next-auth";

import {
    DEFAULT_URL_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return;
    }

    // if (isAuthRoute) {
    //     if (isLoggedIn) {
    //         Response.redirect(new URL(DEFAULT_URL_LOGIN_REDIRECT, nextUrl.pathname));
    //     }
    //     return;
    // }

    // if (!isPublicRoutes && !isLoggedIn) {
    //     Response.redirect(new URL('/user-login', nextUrl.pathname));
    // }

    // console.log('nextUrl', nextUrl.pathname);
    return;
})

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}