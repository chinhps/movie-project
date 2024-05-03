"use client";

import { login } from "@/actions/login";
import { LoginSchema } from "@/schemas";
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
import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function UserLoginPage() {
  const [isLoading, startTransition] = useTransition();
  const toast = useToast();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(values).then((data) => {
        if (data) {
          toast({
            description: data?.message,
            status: data?.type as "success" | "error",
          });
        }
      });
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
            ĐĂNG NHẬP NGAY
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
                  {...register("username")}
                />
                <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.password}>
                <Input
                  variant="auth"
                  type="password"
                  placeholder="Mật khẩu"
                  {...register("password")}
                />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>
            </Stack>
            <Checkbox
              ml="0.5rem"
              size="md"
              colorScheme="green"
              defaultChecked
              color="gray.600"
              // {...register("remember")}
            >
              Ghi nhớ mật khẩu
            </Checkbox>
            <Button
              type="submit"
              variant="mainButton"
              w="100%"
              py="1.5rem"
              isLoading={isLoading}
            >
              ĐĂNG NHẬP NGAY
            </Button>
          </Stack>
        </form>
        <Center color="gray.600" fontSize="15px">
          <Link href="/user-register">Bạn chưa có tài khoản? Đăng ký ngay</Link>
        </Center>
      </Stack>
    </>
  );
}
