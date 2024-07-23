"use client";

import bookmarkApi from "@/apis/bookmark";
import { saveBookmark } from "@/libs/function";
import { IBookmark } from "@/types/response/movies.type";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect } from "react";

function Bookmarks() {
  const session = useSession();
  const toast = useToast();

  const bookmarksQuery = useQuery({
    queryKey: ["bookmarks-user"],
    queryFn: () => bookmarkApi.bookmarksUser(session.data?.user.token ?? ""),
    retry: false,
    enabled: !!session.data?.user.token,
    refetchOnWindowFocus: false,
  });

  const bookmarkMutation = useMutation({
    mutationFn: (slug: string) =>
      bookmarkApi.toggleBookmark({
        slug: slug,
        token: session.data?.user.token ?? "",
      }),
  });

  const handleBookmark = useCallback(() => {
    if (bookmarksQuery.data?.data) {
      const localBookmarks: Array<IBookmark> = JSON.parse(
        localStorage.getItem("movie-bookmarks") ?? "[]"
      );
      const newHistory = bookmarksQuery.data?.data.map((slugBookmark) => {
        return {
          slug: slugBookmark,
        };
      });
      if (localBookmarks.toString() !== newHistory.toString()) {
        const inLocal = localBookmarks.filter(
          (item) => !newHistory.includes(item)
        );
        console.log("server missing", inLocal);

        const inServer = newHistory.filter(
          (item) => !localBookmarks.includes(item)
        );
        console.log("local missing", inServer);

        toast({
          description: "Đã đồng bộ bookmark!",
        });
      }
    }
  }, [bookmarksQuery.data?.data, toast]);

  useEffect(() => {
    handleBookmark();
  }, [handleBookmark]);

  return <></>;
}
export default React.memo(Bookmarks);
