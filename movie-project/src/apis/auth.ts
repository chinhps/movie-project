import fetchC from "@/libs/fetchC";
import { IBaseResponse, IResponseWithMessage } from "@/types/base.type";

const authApi = {
    login: async (username: string, password: string) => {
        const url = "/auth/login";
        const res: IResponseWithMessage = await fetchC.post(url, {
            username, password
        }, {
            cache: "no-store"
        });
        return res;
    }
}

export default authApi;