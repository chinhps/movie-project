"use client";
import { login } from "@/actions/login";
import authApi from "@/apis/auth";
import { RegisterSchema } from "@/schemas";
import { ICreateRegister } from "@/types/auth.type";
import {
  Box,
  Button,
  Center,
  Checkbox,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function UserRegisterPage() {
  const [dataUser, setDataUser] = useState<{
    username: string;
    password: string;
  }>();
  const toast = useToast();
  const {
    formState: { errors },
    handleSubmit,
    register: registerFrom,
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  });
  const registerMutate = useMutation({
    mutationFn: (params: ICreateRegister) => authApi.register(params),
    onSuccess: ({ data }) => {
      toast({
        status: "success",
        description: data.msg,
      });
      if (dataUser) {
        login(dataUser);
      }
    },
    onError: (data) => {
      toast({
        status: "error",
        description: data.message,
      });
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    registerMutate.mutate({
      email: "",
      username: values.username,
      password: values.password,
    });
    setDataUser({
      username: values.username,
      password: values.password,
    });
  };

  return (
    <>
      <Stack
        bg="var(--bg-auth-from)"
        rounded={"xl"}
        p={{ base: 4, sm: 6, md: 8 }}
        spacing={5}
        maxW={{ lg: "lg" }}
        shadow="box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;"
      >
        <Stack spacing={4} my="2rem">
          <Heading color="gray.800" fontSize="3xl" textAlign="center">
            ĐĂNG KÝ NGAY
          </Heading>
          <Text color="gray.500" fontSize="md" textAlign="center" px={2}>
            Bạn có thể lưu trữ phim, chia sẻ, nhắn tin với bạn bè
          </Text>
        </Stack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={5}>
            <Stack spacing={3}>
              <FormControl isInvalid={!!errors.username}>
                <Input
                  variant="auth"
                  placeholder="Tài khoản"
                  {...registerFrom("username")}
                />
                <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.password}>
                <Input
                  variant="auth"
                  type="password"
                  placeholder="Mật khẩu"
                  {...registerFrom("password")}
                />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.confirmPassword}>
                <Input
                  variant="auth"
                  type="password"
                  {...registerFrom("confirmPassword")}
                  placeholder="Xác nhận mật khẩu"
                />
                <FormErrorMessage>
                  {errors.confirmPassword?.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>
            <Checkbox
              ml="0.5rem"
              size="md"
              colorScheme="green"
              defaultChecked
              color="gray.600"
            >
              Chấp nhập với Điều khoản & Dịch vụ
            </Checkbox>
            <Button
              variant="mainButton"
              w="100%"
              py="1.5rem"
              type="submit"
              isLoading={registerMutate.isPending}
            >
              ĐĂNG KÝ NGAY
            </Button>
          </Stack>
        </form>
        <Center color="gray.600" fontSize="15px">
          <Link href="/user-login">Bạn đã có tài khoản? Đăng nhập ngay</Link>
        </Center>
      </Stack>
    </>
  );
}
