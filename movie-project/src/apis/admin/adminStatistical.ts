import fetchC from "@/libs/fetchC";
import { IBaseResponseDetail } from "@/types/base.type";
import { IStatisticalCharts } from "@/types/response/statistical.type";

const statisticalApi = {

    charts: async ({ token }: { token: string }) => {
        const url = "/admin/reports/movies";
        const res: IBaseResponseDetail<IStatisticalCharts> = await fetchC.get(url, {
            cache: "no-store",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "content-type": "application/json",
                "Authorization": "Bearer " + token
            },

        });
        return res;
    },

};

export default statisticalApi