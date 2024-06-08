"use client";
import bookmarkApi from "@/apis/bookmark";
import { checkBookmark, removeBookmark, saveBookmark } from "@/libs/function";
import { Button, Icon, IconButton } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";

export interface IBookmarkButtonProps {
  children?: React.ReactNode;
  slug: string;
}

export default function BookmarkButton({
  children,
  slug,
}: IBookmarkButtonProps) {
  const [isBookmark, setIsBookmark] = useState<boolean>(false);
  const session = useSession();

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
    setIsBookmark((prev) => {
      prev ? removeBookmark({ slug: slug }) : saveBookmark({ slug: slug });
      return !prev;
    });
  };

  useEffect(() => {
    if (checkBookmark({ slug })) {
      setIsBookmark(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {children ? (
        <Button
          variant="secondButton"
          w="100%"
          padding="23px 0"
          isLoading={bookmarkMutation.isPending}
          leftIcon={
            isBookmark ? (
              <Icon as={BsSuitHeartFill} color="red" />
            ) : (
              <BsSuitHeart />
            )
          }
          onClick={handleBookmark}
        >
          {children}
        </Button>
      ) : (
        <IconButton
          onClick={handleBookmark}
          aria-label="bookmark"
          icon={
            isBookmark ? (
              <Icon as={BsSuitHeartFill} color="red" />
            ) : (
              <BsSuitHeart />
            )
          }
        />
      )}
    </>
  );
}
