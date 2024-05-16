import fetchC from "@/libs/fetchC";
import { IBaseResponse, IBaseResponseDetail, IResponseWithMessage } from "@/types/base.type";
import { IMovieAdmin } from "@/types/response/movies.type";

const adminMovieApi = {
    list: async ({ token, page }: { token: string, page?: number }) => {
        const url = "/admin/movies";
        const res: IBaseResponse<IMovieAdmin> = await fetchC.get(url, {
            cache: "no-store",
            params: {
                page: (page ?? 1).toString()
            },
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "content-type": "application/json",
                "Authorization": "Bearer " + token
            },

        });
        return res;
    },
    upsert: async ({ token, params }: { token: string, params: object }) => {
        const url = "/admin/movies/upsert";
        const res: IBaseResponseDetail<IResponseWithMessage> = await fetchC.post(url, { ...params }, {
            cache: "no-store",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "content-type": "application/json",
                "Authorization": "Bearer " + token
            },
        });
        return res;
    }
}

export default adminMovieApi;