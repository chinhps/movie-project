"use client";
import bookmarkApi from "@/apis/bookmark";
import { Button, Icon, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";

export interface IBookmarkButtonProps {
  children: React.ReactNode;
  slug: string;
  token: string;
  defaultValue: boolean;
}

export default function BookmarkButton({
  children,
  slug,
  token,
  defaultValue,
}: IBookmarkButtonProps) {
  const toast = useToast();
  const [isBookmark, setIsBookmark] = useState<boolean>(defaultValue);

  const bookmarkMutation = useMutation({
    mutationFn: () =>
      bookmarkApi.toggleBookmark({
        slug: slug,
        token: token,
      }),
    onSuccess: (data) => {
      toast({
        description: data.msg,
        status: "success",
      });
    },
  });

  const handleBookmark = () => {
    if (!token) {
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
