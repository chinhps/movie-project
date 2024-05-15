"use client";

import adminCategoryApi from "@/apis/admin/adminCategory";
import CardCollection, {
  CardHeader,
} from "@/components/Global/Card/CardCollection";
import FormBase from "@/components/Global/Form/FormBase";
import { CreateCategorySchema } from "@/schemas";
import { IUpsertBase } from "@/types/base.type";
import { Text, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function CategoryUpsertPage({
  searchParams: { id },
}: {
  searchParams: { id: number };
}) {
  const session = useSession();
  const toast = useToast();

  const hookForm = useForm<z.infer<typeof CreateCategorySchema>>({
    resolver: zodResolver(CreateCategorySchema),
  });

  const upsertMutate = useMutation({
    mutationFn: (params: IUpsertBase) => adminCategoryApi.upsert(params),
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

  const onSubmit = (values: z.infer<typeof CreateCategorySchema>) => {
    if (session.data?.user.token) {
      upsertMutate.mutate({
        token: session.data?.user.token,
        params: {
          id: id ?? null,
          ...values,
        },
      });
    }
  };

  return (
    <>
      <CardCollection title={id ? "Sửa thể loại" : "Thêm thể loại"}>
        <CardHeader>
          <Text>Thêm và cập nhật thể loại!</Text>
        </CardHeader>
        <FormBase
          isLoading={upsertMutate.isPending}
          hookForm={hookForm}
          onSubmit={onSubmit}
          structures={[
            {
              label: "Tên thể loại",
              name: "name",
              type: "INPUT",
              isRequired: true,
            },
            {
              label: "Mô tả thể loại",
              name: "description",
              type: "TEXTAREA",
              isRequired: true,
            },
          ]}
        />
      </CardCollection>
    </>
  );
}
