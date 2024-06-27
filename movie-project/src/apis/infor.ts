import fetchC from "@/libs/fetchC";
import { IBaseResponse } from "@/types/base.type";
import { IMovieResponse } from "@/types/response/movies.type";

const inforApi = {
    banners: async () => {
        const url = "/informations/banners";
        const res: IBaseResponse<IMovieResponse> = await fetchC.get(url);
        return res;
    },
}

export default inforApi;