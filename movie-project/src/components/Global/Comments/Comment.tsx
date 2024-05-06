import { Box, Divider, Flex, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import TagCustom from "../TagCustom";

interface IComment {
  name: string;
  level: number;
  message: string;
}

export default function Comment(props: IComment) {
  return (
    <VStack align="start" w="100%">
      <CommentMain {...props} />
      <Stack direction="row" align="startz" px={6}>
        {/* <Divider
          height="auto"
          orientation="vertical"
          borderColor="var(--bg-navbar)"
          borderLeftWidth="1px"
        /> */}
        {/* <VStack ml={5}>
          <CommentMain />
          <CommentMain />
          <CommentMain />
        </VStack> */}
      </Stack>
    </VStack>
  );
}

function CommentMain({ name, level, message }: IComment) {
  return (
    <HStack spacing={2} mt={1} width="100%">
      <Box rounded="xl" overflow="hidden">
        <Image src="/images/avatar.png" alt="avatar" width={60} height={60} />
      </Box>
      <VStack align="normal" gap={0} width="100%">
        <HStack spacing={0}>
          <Text as="b" mr={2} fontSize="15px">
            {name}
          </Text>
          <TagCustom text={"Lv: " + level} />
          {/* <TagCustom text="Hội viên" /> */}
        </HStack>
        <Text fontSize="14px">{message}</Text>
      </VStack>
    </HStack>
  );
}
