import fetchC from "@/libs/fetchC";
import { IBaseResponseDetail } from "@/types/base.type";

const pluginApi = {
    infor: async () => {
        const url = "/plugins/infor";
        const res: IBaseResponseDetail<{
            [key: string]: string
        }> = await fetchC.get(url);
        return res;
    },
}

export default pluginApi;