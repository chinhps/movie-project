"use client";

import Header from "@/components/Global/Header";
import { MovieItemV2 } from "@/components/Global/MovieItem";
import HomeLayout from "@/components/Layouts/HomeLayout";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function WatchHistoryPage() {
  const { data: session, update, status } = useSession();
  useEffect(() => {
    console.log(session);
  },[session]);

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
