import fetchC from "@/libs/fetchC";
import { IBaseResponseDetail } from "@/types/base.type";
import { IResponseAuth } from "@/types/response/auth.type";

const authApi = {
    login: async (username: string, password: string) => {
        const url = "/auth/login";
        const res: IBaseResponseDetail<IResponseAuth> = await fetchC.post(url, {
            username, password
        }, {
            cache: "no-store"
        });
        return res;
    }
}

export default authApi;