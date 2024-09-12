"use client";
import bookmarkApi from "@/apis/bookmark";
import { checkBookmark, removeBookmark, saveBookmark } from "@/libs/function";
import { Button, ButtonProps, Icon, IconButton } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";

export interface IBookmarkButtonProps extends ButtonProps {
  children?: React.ReactNode;
  slug: string;
}

export default function BookmarkButton({
  children,
  slug,
  ...res
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
          {...res}
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
          variant="cinemaButton"
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
