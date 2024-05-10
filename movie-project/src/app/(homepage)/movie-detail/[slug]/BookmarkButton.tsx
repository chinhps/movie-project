"use client";
import bookmarkApi from "@/apis/bookmark";
import { checkBookmark, saveBookmark } from "@/libs/function";
import { Button, Icon } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";

export interface IBookmarkButtonProps {
  children: React.ReactNode;
  slug: string;
  token: string;
}

export default function BookmarkButton({
  children,
  slug,
  token,
}: IBookmarkButtonProps) {
  const [isBookmark, setIsBookmark] = useState<boolean>(false);

  const bookmarkMutation = useMutation({
    mutationFn: () =>
      bookmarkApi.toggleBookmark({
        slug: slug,
        token: token,
      }),
  });

  const handleBookmark = () => {
    if (token) {
      bookmarkMutation.mutate();
    }
    saveBookmark({ slug: slug });
    setIsBookmark((prev) => !prev);
  };

  useEffect(() => {
    if (checkBookmark({ slug })) {
      setIsBookmark(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
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
    </>
  );
}
