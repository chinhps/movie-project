import fetchC from "@/libs/fetchC";
import { IBaseResponseData, IBaseResponseDetail, IResponseWithMessage } from "@/types/base.type";
import { IEpisodeDetailAdmin, IEpisodeResponse } from "@/types/response/movies.type";

const adminEpisodeApi = {
    upsert: async ({ token, params }: { token: string, params: object }) => {
        const url = "/admin/episodes/upsert";
        const res: IBaseResponseDetail<IResponseWithMessage> = await fetchC.post(url,
            params,
            {
                cache: "no-store",
                headers: {
                    "content-type": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    "Authorization": "Bearer " + token,
                },
            });
        return res;
    },
    detail: async ({ token, id }: { token: string, id: number }) => {
        const url = "/admin/episodes/" + id;
        const res: IBaseResponseData<IEpisodeDetailAdmin> = await fetchC.get(url, {
            cache: "no-store",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "content-type": "application/json",
                "Authorization": "Bearer " + token
            },

        });
        return res;
    },
}

export default adminEpisodeApi;