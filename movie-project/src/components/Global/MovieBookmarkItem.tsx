"use client";

import bookmarkApi from "@/apis/bookmark";
import { Box, BoxProps, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FiBookmark } from "react-icons/fi";

interface IMovieBookmark extends BoxProps {
  slug: string;
}

export default function MovieBookmarkItem({ slug, ...props }: IMovieBookmark) {
  const toast = useToast();
  const session = useSession();
  const [isBookmark, setIsBookmark] = useState<boolean>(false);

  const bookmarkMutation = useMutation({
    mutationFn: () =>
      bookmarkApi.toggleBookmark({
        slug: slug,
        token: session.data?.user.token ?? "",
      }),
    onSuccess: (data) => {
      toast({
        description: data.msg,
        status: "success",
      });
    },
  });

  const handleBookmark = () => {
    if (!session.data?.user.token) {
      toast({
        description: "Bạn cần đăng nhập để thao tác!",
        status: "info",
      });
      return;
    }
    bookmarkMutation.mutate();
    setIsBookmark((prev) => !prev);
  };
  return (
    <Box
      py={3}
      px={3}
      cursor="pointer"
      roundedBottom="5px"
      // isLoading={bookmarkMutation.isPending}
      bg={isBookmark ? "var(--bg-section)" : "var(--bg-main)"}
      color={isBookmark ? "var(--bg-main)" : "var(--bg-section)"}
      onClick={handleBookmark}
      {...props}
    >
      <FiBookmark />
    </Box>
  );
}
