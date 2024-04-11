import Banner from "@/components/Global/Banner";
import Header from "@/components/Global/Header";
import MovieItem from "@/components/Global/MovieItem";
import HomeLayout from "@/components/Layouts/HomeLayout";
import { Box, Heading } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Banner />
      <Header rightLink={<Link href="/sdfsd">Xem tất cả</Link>}>
        ANIME MỚI CẬP NHẬT
      </Header>
      <HomeLayout>
        {new Array(15).fill(0).map((_, index) => (
          <MovieItem key={index} />
        ))}
      </HomeLayout>
      <Header>BẢNG XẾP HẠNG</Header>
      <HomeLayout>
        {new Array(10).fill(0).map((_, index) => (
          <MovieItem key={index} />
        ))}
      </HomeLayout>
    </>
  );
}
