import authConfig from "@/auth.config";
import NextAuth from "next-auth";

import {
    DEFAULT_URL_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
    userRoutes
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
    const isApiUserRoute = userRoutes.includes(nextUrl.pathname);


    if (isApiAuthRoute) {
        return;
    }

    if (isApiUserRoute && !isLoggedIn) {
        req.nextUrl.pathname = "/user-login";
        return Response.redirect(req.nextUrl);
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            req.nextUrl.pathname = "/";
            return Response.redirect(req.nextUrl);
        }
        return;
    }

    return;
})

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}