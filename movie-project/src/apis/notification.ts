import fetchC from "@/libs/fetchC";
import { IBaseResponse } from "@/types/base.type";
import { INotification } from "@/types/response/notification.type";

const notificationApi = {
    list: async (token: string) => {
        const url = "/user/notification";
        const res: IBaseResponse<INotification> = await fetchC.get(url, {
            cache: "no-store",
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        return res;
    }
}

export default notificationApi;