import fetchC from "@/libs/fetchC";
import { IBaseResponseDetail, IResponseWithMessage } from "@/types/base.type";

const adminEpisodeApi = {
    upsert: async ({ token, params }: { token: string, params: object }) => {
        const url = "/admin/episode/upsert";
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
}

export default adminEpisodeApi;