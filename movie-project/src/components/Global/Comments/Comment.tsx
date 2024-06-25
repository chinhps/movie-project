import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
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
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import TagCustom from "../TagCustom";
import React, { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import relativeTime from "dayjs/plugin/relativeTime";
import { FiMoreHorizontal } from "react-icons/fi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import commentApi from "@/apis/comment";
import useDisclosureData from "@/hooks/useDisclosureData";
import reportApi from "@/apis/report";
import ModalReport from "../Model/ModalReport";
import { useSession } from "next-auth/react";
import InputComment from "./InputComment";
import { usePathname } from "next/navigation";

dayjs.locale("vi");
dayjs.extend(relativeTime);

interface IComment {
  name: string;
  level: number;
  message: string;
  createdAt: string;
  repliesCount: number;
  idComment: number;
  slugMovie: string;
}

export default React.memo(function Comment(props: IComment) {
  const { data: session } = useSession();

  const toast = useToast();
  const {
    isOpen,
    onOpenData,
    onCloseData,
    data: idComment,
  } = useDisclosureData<number>();
  const [reasonReport, setReasonReport] = useState<(string | number)[]>();

  const repliesMutation = useMutation({
    mutationKey: ["comment-reply", props.idComment],
    mutationFn: () =>
      commentApi.replies({ idComment: props.idComment, page: 1 }),
  });

  const reportMutation = useMutation({
    mutationFn: ({ ...data }: { id: number; reason: (string | number)[] }) =>
      reportApi.comment({
        token: session?.user.token ?? "",
        data: {
          id: data.id,
          reason: data.reason,
        },
      }),
    onSuccess: ({ data }) => {
      toast({
        description: data.msg,
        status: "success",
      });
    },
  });

  const handleReport = () => {
    onCloseData();
    if (reasonReport && idComment) {
      reportMutation.mutate({
        id: Number(idComment),
        reason: reasonReport,
      });
    }
  };

  return (
    <>
      <ModalReport
        isOpen={isOpen}
        onCloseData={onCloseData}
        handleSubmit={handleReport}
      >
        <CheckboxGroup
          colorScheme="green"
          onChange={(vl) => setReasonReport(vl)}
        >
          <Stack spacing={2} direction="column">
            <Checkbox value="spam">Spam</Checkbox>
            <Checkbox value="trouble">Quấy rối</Checkbox>
            <Checkbox value="other">Khác</Checkbox>
          </Stack>
        </CheckboxGroup>
      </ModalReport>
      <VStack align="start" w="100%">
        <CommentItem {...props} onClick={() => onOpenData(props.idComment)} />
        {repliesMutation.data && (
          <Stack direction="row" align="start" px={5}>
            <VStack ml={5} align="start">
              {repliesMutation.data.data.map((reply) => (
                <CommentItem
                  key={reply.id}
                  slugMovie={props.slugMovie}
                  idComment={reply.id}
                  message={reply.message}
                  name={reply.user.name}
                  level={reply.user.level}
                  createdAt={reply.created_at}
                  repliesCount={reply.replies_count}
                  onClick={() => onOpenData(reply.id)}
                />
              ))}
            </VStack>
          </Stack>
        )}

        {props.repliesCount > 0 &&
          (repliesMutation.data
            ? repliesMutation.data.data.length > props.repliesCount
            : true) && (
            <Button
              variant="ghost"
              onClick={() => repliesMutation.mutate()}
              fontSize="14px"
              ml="3rem"
              h={0}
              py="0.8rem"
            >
              Xem {props.repliesCount} câu trả lời
            </Button>
          )}
      </VStack>
    </>
  );
});

interface ICommentItem extends IComment {
  onClick: () => void;
}

export function CommentItem({
  name,
  level,
  message,
  createdAt,
  onClick,
  slugMovie,
  idComment,
}: ICommentItem) {
  const queryClient = useQueryClient();
  const [isReply, setIsReply] = useState(false);

  return (
    <HStack spacing={2} width="100%" alignItems="start">
      <Box rounded="full" overflow="hidden">
        <Image src="/images/avatar.png" alt="avatar" width={50} height={50} />
      </Box>
      <VStack align="normal" gap={0} width="100%">
        <Box bg="white" width="fit-content" p=".8rem" rounded="xl">
          <Flex gap={5} flexDirection="row" justify="space-between">
            <HStack spacing={0} mb={2}>
              <Text as="b" mr={2} fontSize="13px" maxW="100%" noOfLines={1}>
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
                <MenuItem onClick={onClick}>Báo cáo</MenuItem>
              </MenuList>
            </Menu>
          </Flex>

          <Text fontSize="13px">{message}</Text>
        </Box>
        <HStack gap={5} ml={2} fontSize="13px" mt={1}>
          <Text color="var(--text-gray)">{dayjs(createdAt).fromNow()}</Text>
          <Button
            variant="ghost"
            p={0}
            h={0}
            onClick={() => setIsReply((prev) => !prev)}
          >
            Trả lời
          </Button>
        </HStack>
        {isReply && (
          <Box mt={2}>
            <InputComment
              parentId={idComment}
              slugMovie={slugMovie}
              handleSuccess={() => {
                queryClient.refetchQueries({
                  queryKey: ["comment-list", slugMovie],
                });
                setIsReply((prev) => !prev);
              }}
              value={`@${name} `}
            />
          </Box>
        )}
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
