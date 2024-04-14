import { Box, Button, Heading, Input, Stack, Text } from "@chakra-ui/react";

export default function UserRegisterPage() {
  return (
    <>
      <Stack
        bg={"gray.50"}
        rounded={"xl"}
        p={{ base: 4, sm: 6, md: 8 }}
        spacing={{ base: 8 }}
        maxW={{ lg: "lg" }}
      >
        <Stack spacing={4}>
          <Heading color="gray.800" fontSize="3xl">
            ĐĂNG KÝ NGAY
          </Heading>
          <Text color="gray.500" fontSize="md">
            Bạn có thể lưu trữ phim, chia sẻ, nhắn tin với tài khoản của mình
          </Text>
        </Stack>
        <Box as="form">
          <Stack spacing={4}>
            <Input
              placeholder="Firstname"
              bg={"gray.100"}
              border={0}
              color={"gray.500"}
              _placeholder={{
                color: "gray.500",
              }}
            />
            <Input
              placeholder="firstname@lastname.io"
              bg={"gray.100"}
              border={0}
              color={"gray.500"}
              _placeholder={{
                color: "gray.500",
              }}
            />
            <Input
              placeholder="+1 (___) __-___-___"
              bg={"gray.100"}
              border={0}
              color={"gray.500"}
              _placeholder={{
                color: "gray.500",
              }}
            />
          </Stack>
          <Button
            fontFamily={"heading"}
            mt={8}
            w={"full"}
            bgGradient="linear(to-r, red.400,pink.400)"
            color={"white"}
            _hover={{
              bgGradient: "linear(to-r, red.400,pink.400)",
              boxShadow: "xl",
            }}
          >
            ĐĂNG KÝ NGAY
          </Button>
        </Box>
        form
      </Stack>
    </>
  );
}
