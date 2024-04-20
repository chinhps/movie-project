import fetchC from "@/libs/fetchC";
import { IBaseResponse, IBaseResponseDetail } from "@/types/base.type";
import { ICategoryResponse } from "@/types/response/category.type";

const categoryApi = {
    list: async () => {
        const url = "/categories";
        const res: IBaseResponse<ICategoryResponse> = await fetchC.get(url, {
            cache: "no-store"
        });
        return res;
    },
    detail: async (slug: string) => {
        const url = "/categories/" + slug;
        const res: IBaseResponseDetail<ICategoryResponse> = await fetchC.get(url, {
            cache: "no-store"
        });
        return res;
    }
}

export default categoryApi;