import authConfig from "@/auth.config";
import NextAuth from "next-auth";

import {
    adminRoutes,
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
    userRoutes
} from "@/routes";

const { auth } = NextAuth(authConfig);

function isMatchingRoute(pathname: string, routes: string[]) {
    return routes.some(route => pathname === route || pathname.startsWith(`${route}/`));
}

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
    const isApiUserRoute = isMatchingRoute(nextUrl.pathname, userRoutes);
    const isApiAdminRoute = isMatchingRoute(nextUrl.pathname, adminRoutes);

    if (isApiAuthRoute) {
        return;
    }

    if (isApiAdminRoute && req.auth?.user.role !== "ADMIN") {
        req.nextUrl.pathname = "/user-login";
        return Response.redirect(req.nextUrl);
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