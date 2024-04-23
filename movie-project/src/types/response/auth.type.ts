export interface IResponseAuth {
    token: string,
    msg: string,
    user: {
        providerId: string,
        name: string,
        username: string,
        level: number,
        created_at: string
    },
}