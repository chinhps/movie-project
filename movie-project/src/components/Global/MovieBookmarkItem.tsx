"use client";

import bookmarkApi from "@/apis/bookmark";
import { checkBookmark, saveBookmark } from "@/libs/function";
import { Box, BoxProps, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FiBookmark } from "react-icons/fi";

interface IMovieBookmark extends BoxProps {
  slug: string;
}

export default function MovieBookmarkItem({ slug, ...props }: IMovieBookmark) {
  const session = useSession();
  const [isBookmark, setIsBookmark] = useState<boolean>(false);

  const bookmarkMutation = useMutation({
    mutationFn: () =>
      bookmarkApi.toggleBookmark({
        slug: slug,
        token: session.data?.user.token ?? "",
      }),
  });

  const handleBookmark = () => {
    if (session.data?.user.token) {
      bookmarkMutation.mutate();
    }
    saveBookmark({ slug: slug });
    setIsBookmark((prev) => !prev);
  };

  useEffect(() => {
    if (checkBookmark({ slug })) {
      setIsBookmark(true);
      return;
    }
    setIsBookmark(false);
  }, [slug]);

  return (
    <Box
      py={3}
      px={3}
      cursor="pointer"
      roundedBottom="5px"
      bg={isBookmark ? "var(--bg-section)" : "var(--bg-main)"}
      color={isBookmark ? "var(--bg-main)" : "var(--bg-section)"}
      onClick={handleBookmark}
      {...props}
    >
      <FiBookmark />
    </Box>
  );
}
