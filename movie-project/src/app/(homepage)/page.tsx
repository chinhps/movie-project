import Banner from "@/components/Global/Banner";
import Header from "@/components/Global/Header";
import MovieItem, {
  MovieItemV2,
  MovieItemV3,
} from "@/components/Global/MovieItem";
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
      <HomeLayout mt={5}>
        {new Array(15).fill(0).map((_, index) => (
          <MovieItemV2 key={index} />
        ))}
      </HomeLayout>
      <Header>BẢNG XẾP HẠNG</Header>
      <HomeLayout>
        {new Array(5).fill(0).map((_, index) => (
          <MovieItemV3 key={index} />
        ))}
      </HomeLayout>
      <Header>TẤT CẢ PHIM</Header>
      <HomeLayout>
        {new Array(10).fill(0).map((_, index) => (
          <MovieItem key={index} />
        ))}
      </HomeLayout>
    </>
  );
}
