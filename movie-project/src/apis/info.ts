import fetchC from "@/libs/fetchC";
import { IBaseResponse, IBaseResponseDetail } from "@/types/base.type";
import { IMovieResponse } from "@/types/response/movies.type";

const infoApi = {
    banners: async () => {
        const url = "/informations/banners";
        const res: IBaseResponse<IMovieResponse> = await fetchC.get(url);
        return res;
    },
    infos: async () => {
        const url = "/informations";
        const res: IBaseResponseDetail<{
            [key: string]: string
        }> = await fetchC.get(url);
        return res;
    },
}

export default infoApi;