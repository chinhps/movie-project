"use client";

import commentApi from "@/apis/comment";
import Comment from "@/components/Global/Comments/Comment";
import { numberFormat } from "@/libs/function";
import { CommentSchema } from "@/schemas";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  IconButton,
  Input,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiCornerDownRight, FiMeh, FiStar } from "react-icons/fi";
import * as z from "zod";

export interface ICommentsProps {
  slug: string;
}

export default function Comments({ slug, ...props }: ICommentsProps) {
  const { data: session } = useSession();
  const toast = useToast();
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
    onSuccess: (data) => {
      toast({
        description: data.msg,
        status: "success",
      });
      commentsQuery.refetch();
      setValue("message", "");
    },
    onError: (data) => {
      toast({
        description: "dfbdfbdf",
        status: "warning",
      });
    },
  });

  const onSubmit = (values: z.infer<typeof CommentSchema>) => {
    commentAddMutation.mutate(values.message);
  };

  return (
    <>
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
      <VStack bg="white" rounded={5} p={5}>
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
              />
            ))}
          </Fragment>
        ))}
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
