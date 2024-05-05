"use client";

import moviesApi from "@/apis/movie";
import Header from "@/components/Global/Header";
import { MovieItemV2 } from "@/components/Global/MovieItem";
import HomeLayout from "@/components/Layouts/HomeLayout";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function WatchHistoryPage() {
  const { data: session } = useSession();

  useEffect(() => {
    console.log(session);
  }, [session]);

  const historyQuery = useQuery({
    queryKey: ["watch-history"],
    queryFn: () => moviesApi.historyClient(JSON.parse(
      localStorage.getItem("movie-history") ?? "[]"
    )),
    retry: false,
  });

  return (
    <>
      <Header>LỊCH SỬ PHIM ĐÃ XEM</Header>
      <HomeLayout mt={5}>
        {/* {new Array(15).fill(0).map((_, index) => (
          <MovieItemV2 key={index} watched="Đã xem tập 18" />
        ))} */}
      </HomeLayout>
    </>
  );
}
