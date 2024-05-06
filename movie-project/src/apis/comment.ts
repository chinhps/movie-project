import fetchC from "@/libs/fetchC";
import { IBaseResponse } from "@/types/base.type";
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
    createComment: async ({ movieSlug, token, message }: { movieSlug: string, token: string, message: string }) => {
        const url = "/comments/movie";
        const res: IBaseResponse<ICommentResponse> = await fetchC.post(url, { message: message, slug: movieSlug }, {
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "content-type": "application/json",
                "Authorization": "Bearer " + token
            },
        });
        return res;
    },
}

export default commentApi;