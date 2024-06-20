import { IUserAdminCustom } from "./user.type"

export interface IReportBase {
    id: number,
    description: Array<string>,
    status: 'pending' | 'success' | 'spam',
    user: IUserAdminCustom,
}

export interface IReportComment extends IReportBase {
    comment: {
        id: number,
        message: string,
        status: "off" | "on"
    }
}

export interface IReportMovie extends IReportBase {
    movie: {
        id: number,
        movie_name: string,
        slug: string
    }
}