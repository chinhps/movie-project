"use client";

import moviesApi from "@/apis/movie";
import Header from "@/components/Global/Header";
import { MovieItemV2 } from "@/components/Global/MovieItem";
import HomeLayout from "@/components/Layouts/HomeLayout";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function WatchHistoryPage() {
  const { data: session } = useSession();

  const historyClientQuery = useQuery({
    queryKey: ["watch-history-client"],
    queryFn: () =>
      moviesApi.historyClient(
        JSON.parse(localStorage.getItem("movie-history") ?? "[]")
      ),
    retry: false,
    enabled: !!localStorage.getItem("movie-history"),
  });

  const historyQuery = useQuery({
    queryKey: ["watch-history-account"],
    queryFn: () => moviesApi.historyAccount(session?.user.token ?? ""),
    retry: false,
    enabled: !!session,
  });

  return (
    <>
      <Header>LỊCH SỬ Ở TRÌNH DUYỆT</Header>
      <HomeLayout mt={5}>
        {historyClientQuery.isLoading &&
          new Array(10)
            .fill(0)
            .map((_, index) => <MovieItemV2.skeleton key={index} />)}
        {historyClientQuery.data?.data.map((movie, index) => (
          <MovieItemV2
            key={index}
            movie={movie.movie}
            watched={"Đã xem " + movie.episode_name}
          />
        ))}
      </HomeLayout>
      <Header>LỊCH SỬ TÀI KHOẢN</Header>
      <HomeLayout mt={5}>
        {historyQuery.isLoading &&
          new Array(10)
            .fill(0)
            .map((_, index) => <MovieItemV2.skeleton key={index} />)}
        {historyQuery.data?.data.map((movie, index) => (
          <MovieItemV2 key={index} movie={movie} watched={"Đã xem"} />
        ))}
      </HomeLayout>
    </>
  );
}
