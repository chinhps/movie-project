"use client";

import adminPluginApi from "@/apis/admin/adminPlugin";
import CardCollection from "@/components/Global/Card/CardCollection";
import FormBase, { IFormInput } from "@/components/Global/Form/FormBase";
import { Text, useToast } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export default function PluginUpsertPage({
  params: { id },
}: {
  params: { id: string };
}) {
  /****----------------
   *      HOOK
  ----------------****/
  const toast = useToast();
  const session = useSession();
  const [formValue, setFormValue] = useState({});
  const [form, setForm] = useState<Array<IFormInput>>([]);

  const hookForm = useForm();
  const pluginMutation = useMutation({
    mutationFn: (data: object) =>
      adminPluginApi.upsert({
        token: session.data?.user.token ?? "",
        params: data,
      }),
    onSuccess: ({ data }) => {
      toast({
        status: "success",
        description: data.msg,
      });
    },
  });
  const pluginQuery = useQuery({
    queryKey: ["plugin-detail", id],
    queryFn: () =>
      adminPluginApi.detail({
        token: session.data?.user.token ?? "",
        id: Number(id),
      }),
    enabled: !!id && !!session.data?.user.token,
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (pluginQuery.data?.data) {
      setForm(pluginQuery.data?.data.form_public);
      const result: { [key: string]: string | number } = {};
      for (const vl of pluginQuery.data?.data.data_public) {
        result[vl.key] = vl.value;
      }
      setFormValue(result);
    }
  }, [pluginQuery.data?.data]);

  /****----------------
   *      END-HOOK
  ----------------****/
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    pluginMutation.mutate({ id: Number(id), data: data });
  };

  return (
    <>
      <CardCollection
        title={id ? `Chỉnh sửa Plugin #${id}` : "Tạo mới shop"}
        fontSize="25px"
      >
        <Text>Thông báo cho quản trị viên trước khi thực hiện</Text>
        <FormBase
          hookForm={hookForm}
          isLoading={pluginMutation.isPending}
          dataDefault={formValue}
          structures={form}
          onSubmit={onSubmit}
          buttonText="Xác nhận"
        />
      </CardCollection>
    </>
  );
}
