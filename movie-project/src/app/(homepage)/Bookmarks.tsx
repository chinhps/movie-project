"use client";

import bookmarkApi from "@/apis/bookmark";
import { saveBookmark } from "@/libs/function";
import { IBookmark } from "@/types/response/movies.type";
import { useToast } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Bookmarks() {
  const session = useSession();
  const toast = useToast();

  const bookmarksQuery = useQuery({
    queryKey: ["bookmarks-user"],
    queryFn: () => bookmarkApi.bookmarksUser(session.data?.user.token ?? ""),
    retry: false,
    enabled: !!session.data?.user.token,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
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
        bookmarksQuery.data?.data.map((slugBookmark) => {
          saveBookmark({
            slug: slugBookmark,
          });
        });
        toast({
          description: "Đã đồng bộ bookmark!",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookmarksQuery.isFetching]);

  return <></>;
}
