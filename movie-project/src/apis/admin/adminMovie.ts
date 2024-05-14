import fetchC from "@/libs/fetchC";
import { IBaseResponse } from "@/types/base.type";
import { ICategoryResponse } from "@/types/response/category.type";

const adminMovieApi = {
    list: async () => {
        const url = "/admin/movies";
        const res: IBaseResponse<ICategoryResponse> = await fetchC.get(url, {
            cache: "no-store"
        });
        return res;
    }
}

export default adminMovieApi;