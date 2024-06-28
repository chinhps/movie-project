import fetchC from "@/libs/fetchC";
import { objectToFormData } from "@/libs/function";
import { IBaseResponseDetail, IResponseWithMessage } from "@/types/base.type";
import { IUserAuth } from "@/types/response/auth.type";
import { IChangeInfo, IUserChangePassword } from "@/types/user.type";

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
    info: async (token: string) => {
        const url = "/user/infor";
        const res: IBaseResponseDetail<IUserAuth> = await fetchC.get(url, {
            cache: "no-store",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "content-type": "application/json",
                "Authorization": "Bearer " + token
            }
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
    },
    changeInfo: async ({ params, token }: IChangeInfo) => {
        const formData = new FormData();
        objectToFormData(formData, params);
        const url = "/user/change-info";
        const res: IBaseResponseDetail<IResponseWithMessage> = await fetchC.postFormData(url, formData, {
            cache: "no-store",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization": "Bearer " + token
            }
        });
        return res;
    },
}

export { userApi }