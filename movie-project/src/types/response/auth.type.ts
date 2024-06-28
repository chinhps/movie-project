export interface IResponseAuth {
    token: string,
    msg: string | Array<string>,
    user: IUserAuth,
}

export interface IUserAuth {
    providerId: string,
    name: string,
    username: string,
    level: number,
    created_at: string,
    token?: string,
    role: "ADMIN" | "USER",
    avatar_url: string
}