import fetchC from "@/libs/fetchC";
import { IBaseResponse } from "@/types/base.type";
import { IUserAdmin } from "@/types/response/user.type";

const adminUserApi = {
    list: async ({ token, page }: { token: string, page?: number }) => {
        const url = "/admin/users";
        const res: IBaseResponse<IUserAdmin> = await fetchC.get(url, {
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

export default adminUserApi;