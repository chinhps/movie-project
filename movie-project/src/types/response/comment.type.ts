export interface ICommentResponse {
    id: number,
    message: string,
    user: {
        name: string,
        level: number
    }
}