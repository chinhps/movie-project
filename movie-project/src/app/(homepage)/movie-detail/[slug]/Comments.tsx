"use client";

import commentApi from "@/apis/comment";
import reportApi from "@/apis/report";
import Comment, {
  CommentItem,
  CommentItemSkeleton,
} from "@/components/Global/Comments/Comment";
import FormBase from "@/components/Global/Form/FormBase";
import ModalReport from "@/components/Global/Model/ModalReport";
import useDisclosureData from "@/hooks/useDisclosureData";
import { numberFormat } from "@/libs/function";
import { CommentSchema } from "@/schemas";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { FiCornerDownRight } from "react-icons/fi";
import * as z from "zod";

export interface ICommentsProps {
  slug: string;
}

export default function Comments({ slug }: ICommentsProps) {
  const { data: session } = useSession();
  const toast = useToast();
  const {
    isOpen,
    onOpenData,
    onCloseData,
    data: idComment,
  } = useDisclosureData<number>();
  const [reasonReport, setReasonReport] = useState<(string | number)[]>();

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema),
  });
  const commentsQuery = useInfiniteQuery({
    queryKey: ["comment-list", slug],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      commentApi.commentsMovie({ slug, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.paginate?.current_page === lastPage.paginate?.last_page
        ? undefined
        : (lastPage.paginate?.current_page ?? 1) + 1,
    retry: false,
  });

  const commentAddMutation = useMutation({
    mutationFn: (message: string) =>
      commentApi.createComment({
        movieSlug: slug,
        message: message,
        token: session?.user.token ?? "",
      }),
    onSuccess: ({ data }) => {
      toast({
        description: data.msg,
        status: "success",
      });
      commentsQuery.refetch();
      setValue("message", "");
    },
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

  const onSubmit = (values: z.infer<typeof CommentSchema>) => {
    commentAddMutation.mutate(values.message);
  };

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

      <VStack spacing={3} align="start">
        <Text as="b">
          Bình luận (
          {numberFormat(
            commentsQuery.data?.pages[0]?.paginate?.total ?? 0,
            false
          )}
          )
        </Text>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <HStack
            rounded="xl"
            position="relative"
            bg="var(--bg-white)"
            height="100%"
            p={5}
          >
            <FormControl isInvalid={!!errors.message}>
              <FormErrorMessage>
                <Text ml={3}>{errors.message?.message}</Text>
              </FormErrorMessage>
              <Textarea
                p={0}
                rows={3}
                resize="none"
                placeholder="Viết gì đó tại đây..."
                bg="var(--bg-white)"
                variant="pill"
                {...register("message")}
              />
            </FormControl>
            <IconButton
              type="submit"
              isLoading={commentAddMutation.isPending}
              aria-label="send comment"
              icon={<FiCornerDownRight />}
            />
          </HStack>
        </form>
      </VStack>
      <VStack rounded={5} my={5}>
        {commentsQuery.data?.pages[0]?.paginate?.total === 0 && (
          <Text mx="auto" fontSize="14px" color="var(--bg-section)">
            Chưa có ai bình luận! Hãy là người đầu tiên ❤
          </Text>
        )}
        {commentsQuery.data?.pages.map((group, i) => (
          <Fragment key={i}>
            {group?.data.map((comment) => (
              <Comment
                key={comment.id}
                message={comment.message}
                name={comment.user.name}
                level={comment.user.level}
                createdAt={comment.created_at}
                onClick={() => onOpenData(comment.id)}
              />
            ))}
          </Fragment>
        ))}
        {commentsQuery.isPending &&
          new Array(5)
            .fill(0)
            .map((_, index) => <CommentItemSkeleton key={index} />)}
        {commentsQuery.hasNextPage && !commentsQuery.isFetchingNextPage && (
          <Button
            mx="auto"
            variant="pill"
            fontSize="14px"
            color="var(--bg-section)"
            isLoading={commentsQuery.isFetching}
            onClick={() => commentsQuery.fetchNextPage()}
          >
            Xem thêm bình luận...
          </Button>
        )}
      </VStack>
    </>
  );
}
