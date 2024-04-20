import {
  Box,
  Button,
  Center,
  Checkbox,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";

export default function UserRegisterPage() {
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
        <Stack spacing={5}>
          <Stack spacing={3}>
            <Input variant="auth" placeholder="Tài khoản" />
            <Input variant="auth" type="password" placeholder="Mật khẩu" />
            <Input
              variant="auth"
              type="password"
              placeholder="Xác nhận mật khẩu"
            />
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
          <Button variant="mainButton" w="100%" py="1.5rem">
            ĐĂNG KÝ NGAY
          </Button>
        </Stack>
        <Center color="gray.600" fontSize="15px">
          <Link href="/user-login">Bạn đã có tài khoản? Đăng nhập ngay</Link>
        </Center>
      </Stack>
    </>
  );
}
