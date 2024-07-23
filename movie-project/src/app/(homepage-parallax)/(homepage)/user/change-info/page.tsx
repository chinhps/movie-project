"use client";

import { userApi } from "@/apis/user";
import CardCollection from "@/components/Global/Card/CardCollection";
import FormBase from "@/components/Global/Form/FormBase";
import { ChangeInfoSchema } from "@/schemas";
import { IChangeInfo } from "@/types/user.type";
import {
  Avatar,
  Box,
  Button,
  Center,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function ChangeInfoPage() {
  const toast = useToast();
  const session = useSession();
  const [avatar, setAvatar] = useState<File>();
  const inputRef = useRef<HTMLInputElement>(null);
  const hookForm = useForm<z.infer<typeof ChangeInfoSchema>>({
    resolver: zodResolver(ChangeInfoSchema),
  });

  const changeInfoMutate = useMutation({
    mutationFn: (params: IChangeInfo) => userApi.changeInfo(params),
    onSuccess: ({ data }) => {
      session.update({});
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

  const handleFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setAvatar(files[0]);
    }
  };

  const onSubmit = (values: z.infer<typeof ChangeInfoSchema>) => {
    if (session.data?.user.token) {
      changeInfoMutate.mutate({
        params: {
          avatar: avatar,
          name: values.name,
          description: values.description,
        },
        token: session.data?.user.token,
      });
    }
  };

  return (
    <>
      <CardCollection title="Chỉnh sửa thông tin">
        <SimpleGrid columns={12}>
          <GridItem colSpan={4} mx="auto">
            <Box
              position="relative"
              rounded="full"
              overflow="hidden"
              w="fit-content"
              mt="2rem"
            >
              <Button
                zIndex={2}
                position="absolute"
                inset={0}
                m="auto"
                w="fit-content"
                onClick={(e) => inputRef.current?.click()}
              >
                THAY ĐỔI
              </Button>
              <Input
                ref={inputRef}
                hidden
                type="file"
                onChange={handleFileDrop}
              />
              <Box
                zIndex={1}
                position="absolute"
                inset={0}
                bg="var(--bg-avatar)"
              />
              {session.data?.user.name && (
                <Image
                  src={
                    avatar && typeof avatar === "object"
                      ? URL.createObjectURL(avatar)
                      : session.data?.user.avatar_url
                      ? session.data?.user.avatar_url
                      : `https://ui-avatars.com/api/?name=${session.data?.user.name}`
                  }
                  width={250}
                  height={250}
                  alt="avatar"
                />
              )}
            </Box>
          </GridItem>
          <GridItem colSpan={8}>
            <FormBase
              hookForm={hookForm}
              isLoading={changeInfoMutate.isPending}
              dataDefault={{
                name: session.data?.user.name,
              }}
              structures={[
                {
                  label: "Tên người dùng hiển thị",
                  type: "INPUT",
                  name: "name",
                },
                {
                  label: "Tiểu sử",
                  type: "TEXTAREA",
                  name: "description",
                  disable: true,
                },
              ]}
              onSubmit={onSubmit}
              buttonText="Xác nhận"
            />
          </GridItem>
        </SimpleGrid>
      </CardCollection>
    </>
  );
}
