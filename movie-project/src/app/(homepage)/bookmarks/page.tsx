"use client";

import bookmarkApi from "@/apis/bookmark";
import Header from "@/components/Global/Header";
import { MovieItemV2 } from "@/components/Global/MovieItem";
import Paginate from "@/components/Global/Paginate";
import HomeLayout from "@/components/Layouts/HomeLayout";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function BookmarkPage() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const bookmarkQuery = useQuery({
    queryKey: ["bookmarks-client", page],
    queryFn: () =>
      bookmarkApi.bookmarksClient({
        data: JSON.parse(localStorage.getItem("movie-bookmarks") ?? "[]"),
        page: Number(page ?? 1),
      }),
    retry: false,
    enabled: false,
  });

  useEffect(() => {
    if (localStorage.getItem("movie-bookmarks")) {
      bookmarkQuery.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <>
      <Header>BOOKMARK CỦA BẠN</Header>
      <HomeLayout mt={5}>
        {bookmarkQuery.isLoading &&
          new Array(10)
            .fill(0)
            .map((_, index) => <MovieItemV2.skeleton key={index} />)}
        {bookmarkQuery.data?.data.map((movie, index) => (
          <MovieItemV2 key={movie.id} movie={movie} />
        ))}
      </HomeLayout>
      {bookmarkQuery.data?.paginate && (
        <Paginate
          pageLink="/bookmarks"
          currentPage={bookmarkQuery.data?.paginate.current_page}
          totalPage={bookmarkQuery.data?.paginate.last_page}
        />
      )}
    </>
  );
}
