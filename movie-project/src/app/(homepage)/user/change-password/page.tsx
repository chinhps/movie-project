"use client";

import { userApi } from "@/apis/user";
import CardCollection, {
  CardHeader,
} from "@/components/Global/Card/CardCollection";
import FormBase from "@/components/Global/Form/FormBase";
import { ChangePasswordSchema } from "@/schemas";
import { IUserChangePassword } from "@/types/user.type";
import { useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function UserChangePasswordPage() {
  const toast = useToast();
  const session = useSession();
  const hookForm = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const changePasswordMutate = useMutation({
    mutationFn: (params: IUserChangePassword) => userApi.changePassword(params),
    onSuccess: ({ data }) => {
      toast({
        status: "success",
        description: data.msg,
      });
    },
    onError: (data) => {
      toast({
        status: "error",
        description: data.message,
      });
    },
  });

  const onSubmit = (values: z.infer<typeof ChangePasswordSchema>) => {
    if (session.data?.user.token) {
      changePasswordMutate.mutate({
        currentPassword: values.current_password,
        newPassowrd: values.password,
        token: session.data?.user.token,
      });
    }
  };
  return (
    <>
      <CardCollection title="Đổi mật khẩu">
        <CardHeader>Bạn có thể đổi mật khẩu của bạn tại đây!</CardHeader>
        <FormBase
          hookForm={hookForm}
          structures={[
            {
              label: "Mật khẩu cũ",
              type: "INPUT",
              name: "current_password",
              isPassword: true,
            },
            {
              label: "Mật khẩu mới",
              type: "INPUT",
              name: "password",
              isPassword: true,
            },
            {
              label: "Xác nhận mật khẩu mới",
              type: "INPUT",
              name: "confirmPassword",
              isPassword: true,
            },
          ]}
          isLoading={changePasswordMutate.isPending}
          onSubmit={onSubmit}
          buttonText="Xác nhận"
        />
      </CardCollection>
    </>
  );
}
