import fetchC from "@/libs/fetchC";
import { IBaseResponse, IBaseResponseDetail, IResponseWithMessage } from "@/types/base.type";
import { IReportComment, IReportMovie } from "@/types/response/report.type";

const adminReportApi = {
    comment: async ({ token, page }: { token: string, page?: number }) => {
        const url = "/admin/reports/comments";
        const res: IBaseResponse<IReportComment> = await fetchC.get(url, {
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
    movie: async ({ token, page }: { token: string, page?: number }) => {
        const url = "/admin/reports/movies";
        const res: IBaseResponse<IReportMovie> = await fetchC.get(url, {
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
    reportAction: async ({ token, params }: { token: string, params: object }) => {
        const url = "/admin/reports/report-action";
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

export default adminReportApi;