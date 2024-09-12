"use client";

import commentApi from "@/apis/comment";
import Comment, {
  CommentItemSkeleton,
} from "@/components/Global/Comments/Comment";
import InputComment from "@/components/Global/Comments/InputComment";
import { numberFormat } from "@/libs/function";
import { Button, Text, VStack } from "@chakra-ui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment } from "react";

export interface ICommentsProps {
  slug: string;
}

export default function Comments({ slug }: ICommentsProps) {
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
        <InputComment
          slugMovie={slug}
          handleSuccess={() => commentsQuery.refetch()}
        />
      </VStack>
      <VStack rounded={5} my={3}>
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
                slugMovie={slug}
                idComment={comment.id}
                message={comment.message}
                name={comment.user.name}
                level={comment.user.level}
                createdAt={comment.created_at}
                repliesCount={comment.replies_count}
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
