export interface ICommentResponse {
    id: number,
    message: string,
    user: {
        name: string,
        level: number
    },
    created_at: string,
    replies_count: number
}