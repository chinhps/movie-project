export interface IUserChangePassword {
    currentPassword: string,
    newPassowrd: string,
    token: string
}

export interface IChangeInfo {
    params: object;
    token: string;
}