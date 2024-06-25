import fetchC from "@/libs/fetchC";
import { IBaseResponse, IBaseResponseDetail, IResponseWithMessage } from "@/types/base.type";
import { ICommentResponse } from "@/types/response/comment.type";

const commentApi = {
    commentsMovie: async ({ slug, page }: { slug: string, page: number }) => {
        const url = "/comments/movie/" + slug;
        const res: IBaseResponse<ICommentResponse> = await fetchC.get(url, {
            cache: "no-store",
            params: {
                page: page.toString()
            }
        });
        return res;
    },
    createComment: async ({ params, token }: { params: object, token: string }) => {
        const url = "/comments/movie";
        const res: IBaseResponseDetail<IResponseWithMessage> = await fetchC.post(url, { ...params }, {
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "content-type": "application/json",
                "Authorization": "Bearer " + token
            },
        });
        return res;
    },
    replies: async ({ idComment, page }: { idComment: number, page: number }) => {
        const url = "/comments/replies/" + idComment;
        const res: IBaseResponse<ICommentResponse> = await fetchC.get(url, {
            cache: "no-store",
            params: {
                page: page.toString()
            }
        });
        return res;
    },
}

export default commentApi;