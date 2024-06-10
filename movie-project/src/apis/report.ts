import fetchC from "@/libs/fetchC";
import { IBaseResponseDetail, IResponseWithMessage } from "@/types/base.type";

const reportApi = {
    comment: async ({ token, data }: {
        token: string,
        data: { id: number, reason: (string | number)[] }
    }) => {
        const url = "/report/comment";
        const res: IBaseResponseDetail<IResponseWithMessage> = await fetchC.post(url, data, {
            cache: "no-store",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "content-type": "application/json",
                "Authorization": "Bearer " + token
            },
        });
        return res;
    },
    movie: async ({ token, data }: {
        token: string,
        data: { slug: string, reason: (string | number)[] }
    }) => {
        const url = "/report/movie";
        const res: IBaseResponseDetail<IResponseWithMessage> = await fetchC.post(url, data, {
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

export default reportApi;