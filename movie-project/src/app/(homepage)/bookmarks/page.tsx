"use client";

import bookmarkApi from "@/apis/bookmark";
import Header from "@/components/Global/Header";
import { MovieItemV2 } from "@/components/Global/MovieItem";
import HomeLayout from "@/components/Layouts/HomeLayout";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function BookmarkPage() {
  const bookmarkQuery = useQuery({
    queryKey: ["bookmarks-client"],
    queryFn: () =>
      bookmarkApi.bookmarksClient(
        JSON.parse(localStorage.getItem("movie-bookmarks") ?? "[]")
      ),
    retry: false,
    enabled: false,
  });

  useEffect(() => {
    if (localStorage.getItem("movie-bookmarks")) {
      bookmarkQuery.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header>BOOKMARK CỦA BẠN</Header>
      <HomeLayout mt={5}>
        {bookmarkQuery.isLoading &&
          new Array(10)
            .fill(0)
            .map((_, index) => <MovieItemV2.skeleton key={index} />)}
        {bookmarkQuery.data?.data.map((movie, index) => (
          <MovieItemV2 key={index} movie={movie} />
        ))}
      </HomeLayout>
    </>
  );
}
