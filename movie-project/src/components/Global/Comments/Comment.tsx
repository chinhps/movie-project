import { Divider, Flex, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import TagCustom from "../TagCustom";

export default function Comment() {
  return (
    <VStack align="start">
      <CommentMain />
      <Stack direction="row" align="startz" px={6}>
        <Divider
          height="auto"
          orientation="vertical"
          borderColor="var(--bg-navbar)"
          borderLeftWidth="1px"
        />
        <VStack ml={5}>
          <CommentMain />
          <CommentMain />
          <CommentMain />
        </VStack>
      </Stack>
    </VStack>
  );
}

function CommentMain() {
  return (
    <HStack spacing={2} mt={2}>
      <Flex height="auto" rounded="xl" overflow="hidden">
        <Image src="/images/avatar.png" alt="avatar" width={60} height={60} />
      </Flex>
      <VStack align="normal" gap={0}>
        <HStack spacing={0}>
          <Text as="b" mr={2} fontSize="17px">
            Hoang Pham
          </Text>
          <TagCustom text="Lv: 30" />
          <TagCustom text="Hội viên" />
        </HStack>
        <Text fontSize="14px">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem
          inventore odio, hic, quia impedit dolore asperiores non consequuntur
          sed totam unde, illum iure fuga nisi sapiente saepe pariatur
          praesentium id?
        </Text>
      </VStack>
    </HStack>
  );
}
