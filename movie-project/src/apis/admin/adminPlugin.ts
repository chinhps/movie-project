import fetchC from "@/libs/fetchC";
import { IBaseResponse, IBaseResponseDetail, IResponseWithMessage } from "@/types/base.type";
import { PluginResponse } from "@/types/response/plugin.type";

const adminPluginApi = {
    list: async ({ token, page }: { token: string, page?: number }) => {
        const url = "/admin/plugins";
        const res: IBaseResponse<PluginResponse> = await fetchC.get(url, {
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
        const url = "/admin/plugins/upsert";
        const res: IBaseResponseDetail<IResponseWithMessage> = await fetchC.post(url, params,
            {
                cache: "no-store",
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "content-type": "application/json",
                    "Authorization": "Bearer " + token,
                },
            });
        return res;
    },
    detail: async ({ token, id }: { token: string, id: number }) => {
        const url = "/admin/plugins/" + id;
        const res: IBaseResponseDetail<PluginResponse> = await fetchC.get(url, {
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

export default adminPluginApi;