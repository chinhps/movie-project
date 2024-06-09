import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import TagCustom from "../TagCustom";
import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import relativeTime from "dayjs/plugin/relativeTime";
import { FiMoreHorizontal } from "react-icons/fi";

dayjs.locale("vi");
dayjs.extend(relativeTime);

interface IComment {
  name: string;
  level: number;
  message: string;
  createdAt: string;
}

export default React.memo(function Comment(props: IComment) {
  return (
    <VStack align="start" w="100%">
      <CommentItem {...props} />
      <Stack direction="row" align="startz" px={5}>
        {/* <Divider
          height="auto"
          orientation="vertical"
          borderColor="var(--bg-main-second)"
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
});

export function CommentItem({ name, level, message, createdAt }: IComment) {
  return (
    <HStack spacing={2} mt={1} width="100%" alignItems="start">
      <Box rounded="full" overflow="hidden">
        <Image src="/images/avatar.png" alt="avatar" width={60} height={60} />
      </Box>
      <VStack align="normal" gap={0} width="100%">
        <Box bg="white" width="fit-content" p="1rem" rounded="xl">
          <Flex gap={5} flexDirection="row" justify="space-between">
            <HStack spacing={0} mb={2}>
              <Text as="b" mr={2} fontSize="14px" maxW="100px" noOfLines={1}>
                {name}
              </Text>
              <TagCustom text={"Lv: " + level} />
            </HStack>
            <Menu>
              <MenuButton
                as={IconButton}
                variant="none"
                height={5}
                aria-label="more comment"
                icon={<FiMoreHorizontal />}
              />
              <MenuList>
                <MenuItem>Báo cáo</MenuItem>
              </MenuList>
            </Menu>
          </Flex>

          <Text fontSize="15px">{message}</Text>
        </Box>
        <HStack gap={5} ml={2}>
          <Text color="var(--text-gray)">{dayjs(createdAt).fromNow()}</Text>
          <Button variant="ghost" p={0} h={0}>
            Trả lời
          </Button>
        </HStack>
      </VStack>
    </HStack>
  );
}

export const CommentItemSkeleton = React.memo(function CommentItemSkeleton() {
  return (
    <>
      <HStack spacing={2} mt={1} width="100%" alignItems="start">
        <Box flex={1}>
          <Skeleton
            borderRadius="100%"
            overflow="hidden"
            width="4.5rem"
            height="4.5rem"
          />
        </Box>
        <VStack align="normal" gap={0} width="100%">
          <Box bg="white" width="fit-content" p="1rem" rounded="xl">
            <SkeletonText w="20rem" mt="4" noOfLines={2} spacing="4" />
          </Box>
        </VStack>
      </HStack>
    </>
  );
});
