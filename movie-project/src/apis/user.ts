import fetchC from "@/libs/fetchC";
import { IBaseResponseDetail, IResponseWithMessage } from "@/types/base.type";
import { IUserChangePassword } from "@/types/user.type";

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
    },
    info: async () => {
        const url = "/api/auth/session";
        const res: IBaseResponseDetail<IResponseWithMessage> = await fetchC.post(url, {}, {
            cache: "no-store",
            BaseURL: "http://localhost:3000"
        });
        return res;
    },
    changePassword: async ({ currentPassword, newPassowrd, token }: IUserChangePassword) => {
        const url = "/user/change-password";
        const res: IBaseResponseDetail<IResponseWithMessage> = await fetchC.post(url, {
            current_password: currentPassword,
            password: newPassowrd,
            password_confirmation: newPassowrd
        }, {
            cache: "no-store",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "content-type": "application/json",
                "Authorization": "Bearer " + token
            }
        });
        return res;
    }
}

export { userApi }