import fetchC from "@/libs/fetchC";
import { IBaseResponse } from "@/types/base.type";
import { ICategoryResponse } from "@/types/response/category.type";

const adminCategoryApi = {
    list: async ({ token, page }: { token: string, page?: number }) => {
        const url = "/admin/categories";
        const res: IBaseResponse<ICategoryResponse> = await fetchC.get(url, {
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
    }
}

export default adminCategoryApi;