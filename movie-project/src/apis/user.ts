import fetchC from "@/libs/fetchC";
import { IBaseResponseDetail, IResponseWithMessage } from "@/types/base.type";

const userApi = {
    signOut: async (token: string) => {
        const url = "/user/logout";
        const res: IBaseResponseDetail<IResponseWithMessage> = await fetchC.post(url, {}, {
            cache: "no-store",
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        return res;
    }
}

export { userApi }