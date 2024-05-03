export const publicRoutes = [
    "/"
];

export const authRoutes = [
    "/user-login",
    "/user-register"
];

export const userRoutes = [
    "/user",
    // "/watch-history"    
]

/*
* Don't proteched api login because api for login
*/
export const apiAuthPrefix = "/api/auth";

/*
* Url after user login
*/
export const DEFAULT_URL_LOGIN_REDIRECT = "http://localhost:3000/";
export const ADMIN_URL_LOGIN_REDIRECT = "/admin"
