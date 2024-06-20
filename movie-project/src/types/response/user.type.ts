export interface IUserAdmin {
    id: number,
    name: string,
    email: null | string,
    username: string,
    email_verified_at: null | string,
    status: "inactive" | "active",
    level: number,
    created_at: string,
    updated_at: string,
    provider_id: string,
    login_type: 'account' | 'facebook' | 'google',
    role: "USER" | "ADMIN",
    comments_count: number
}

export interface IUserAdminCustom {
    id: number,
    name: string,
    email: string,
    username: string,
    level: number,
    provider_id: string
}