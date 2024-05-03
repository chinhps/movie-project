"use server";

import { userApi } from "@/apis/user";
import { auth, signOut } from "@/auth";
import { DEFAULT_URL_LOGIN_REDIRECT } from "@/routes";
import { redirect } from "next/navigation";

const logout = async () => {
    const session = await auth();
    try {
        await signOut({
            redirect: false
        });
        await userApi.signOut(session?.user.token ?? "");
    } catch (error) {
        return { message: "Thất bại khi đăng xuất" }
    } finally {
        redirect(DEFAULT_URL_LOGIN_REDIRECT);
    }
}

export default logout;