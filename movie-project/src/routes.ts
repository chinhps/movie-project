export const publicRoutes = [
    "/"
];

export const authRoutes = [
    "/user-login",
    "/user-register"
];

/*
* Don't proteched api login because api for login
*/
export const apiAuthPrefix = "/api/auth";

/*
* Url after user login
*/
export const DEFAULT_URL_LOGIN_REDIRECT = "/user"