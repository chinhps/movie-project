"use client";

import CardCollection, {
  CardHeader,
} from "@/components/Global/Card/CardCollection";
import FormBase from "@/components/Global/Form/FormBase";

export default function UserChangePasswordPage() {
  const onSubmit = () => {
    console.log(234);
  };
  return (
    <>
      <CardCollection title="Đổi mật khẩu">
        <CardHeader>Bạn có thể đổi mật khẩu của bạn tại đây!</CardHeader>
        <FormBase
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
              name: "confirmation_password",
              isPassword: true,
            },
          ]}
          onSubmit={onSubmit}
          buttonText="Xác nhận"
        />
      </CardCollection>
    </>
  );
}
