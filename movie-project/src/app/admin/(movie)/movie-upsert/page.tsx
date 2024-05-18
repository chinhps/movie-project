"use client";

import adminMovieApi from "@/apis/admin/adminMovie";
import CardCollection, {
  CardHeader,
} from "@/components/Global/Card/CardCollection";
import FormBase from "@/components/Global/Form/FormBase";
import { objectToFormData } from "@/libs/function";
import { CreateMovieSchema } from "@/schemas";
import { IUpsertBase } from "@/types/base.type";
import { Text, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function MovieCreatePage({
  searchParams: { id },
}: {
  searchParams: { id: number };
}) {
  const session = useSession();
  const toast = useToast();
  const [dataDefault, setDataDefault] = useState<object>();

  const hookForm = useForm<z.infer<typeof CreateMovieSchema>>({
    resolver: zodResolver(CreateMovieSchema),
  });

  const detailQuery = useQuery({
    queryKey: ["movie-detail-admin", id],
    queryFn: () =>
      adminMovieApi.detail({ token: session.data?.user.token ?? "", id }),
    enabled: !!id && !!session.data?.user.token,
    retry: false,
  });

  const upsertMutate = useMutation({
    mutationFn: (params: { token: string; params: object }) =>
      adminMovieApi.upsert(params),
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

  useEffect(() => {
    if (detailQuery.data?.data) {
      setDataDefault({
        ...detailQuery.data?.data,
        status: detailQuery.data?.data.status === "on",
      });
    }
  }, [detailQuery.data?.data]);

  const onSubmit = (values: z.infer<typeof CreateMovieSchema>) => {
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
      <CardCollection title={id ? "Sửa thông tin phim" : "Thêm phim mới"}>
        <CardHeader>
          <Text>
            Thêm và cập nhật phim! Thêm phim xong sẽ qua cập nhật tập phim!
          </Text>
        </CardHeader>
        <FormBase
          customStyle={{
            display: "grid",
            gap: "0.5rem",
            gridTemplateAreas: `
              "movie_name movie_name_other"
              "release status"
              "episodes_counter episodes_counter"
              "categories categories"
              "description description"
              "banner_image movie_image"
              "button button"
            `,
          }}
          dataDefault={dataDefault}
          isLoading={upsertMutate.isPending}
          hookForm={hookForm}
          onSubmit={onSubmit}
          structures={[
            {
              label: "Tên phim",
              name: "movie_name",
              type: "INPUT",
              isRequired: true,
            },
            {
              label: "Tên khác của phim",
              name: "movie_name_other",
              type: "INPUT",
              isRequired: false,
            },
            {
              label: "Thời điểm phát hành",
              name: "release",
              type: "INPUT",
              placeholder: "Thời điểm phát hành (Q2 2024)",
              isRequired: false,
            },
            {
              label: "Trạng thái",
              name: "status",
              type: "SWITCH",
              isRequired: true,
            },
            {
              label: "Danh sách thể loại",
              name: "categories",
              type: "TAGS",
              isRequired: true,
            },
            {
              label: "Số tập phim",
              name: "episodes_counter",
              type: "NUMBER",
              isRequired: false,
            },
            {
              label: "Mô tả phim",
              name: "description",
              type: "TEXTAREA",
              isRequired: true,
            },
            {
              label: "Thumbnail Phim",
              name: "banner_image",
              type: "FILE",
              isRequired: true,
            },
            {
              label: "Banner Phim",
              name: "movie_image",
              type: "FILE",
              isRequired: true,
            },
          ]}
        />
      </CardCollection>
    </>
  );
}
