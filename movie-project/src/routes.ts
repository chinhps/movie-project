export const publicRoutes = ["/"];

export const authRoutes = ["/user-login", "/user-register"];

export const userRoutes = [
  "/user",
  // "/watch-history"
];

export const adminRoutes = ["/admin"];

/*
 * Don't proteched api login because api for login
 */
export const apiAuthPrefix = "/api/auth";

/*
 * Url after user login
 */
export const DEFAULT_URL_LOGIN_REDIRECT = process.env.NEXT_PUBLIC_APP_URL;
