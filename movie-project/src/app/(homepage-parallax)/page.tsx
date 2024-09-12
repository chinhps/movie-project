import moviesApi from "@/apis/movie";
import Header from "@/components/Global/Header";
import { MovieItemV2 } from "@/components/Global/MovieItem";
import HeaderV2 from "@/components/Layouts/Header/HeaderV2";
import HomeLayout from "@/components/Layouts/HomeLayout";
import { Container } from "@chakra-ui/react";
import Link from "next/link";

export default async function Home() {
  const moviesLatest = await moviesApi.latest({});
  const moviesRanking = await moviesApi.rankings();

  const moviesList = await moviesApi.list({ page: 1, params: {} });

  return (
    <>
      {/* <Bookmarks /> */}
      {/* <Banner /> */}
      <HeaderV2 />
      <Container size="md">
        <Header
          mb={3}
          mt={5}
          rightLink={() => <Link href="/movie-latest">Xem tất cả</Link>}
        >
          ANIME MỚI CẬP NHẬT
        </Header>
        <HomeLayout mt={5}>
          {moviesLatest.data.map((movie, index) => (
            <MovieItemV2 key={movie.id} movie={movie} />
          ))}
        </HomeLayout>
        <Header mb={3} mt={5}>
          BẢNG XẾP HẠNG
        </Header>
        <HomeLayout>
          {moviesRanking.data.map((movie, index) => (
            <MovieItemV2 key={movie.id} movie={movie} />
          ))}
        </HomeLayout>
        <Header
          mb={3}
          mt={5}
          rightLink={() => <Link href="/movies">Xem tất cả</Link>}
        >
          TẤT CẢ PHIM
        </Header>
        <HomeLayout>
          {moviesList.data.map((movie, index) => (
            <MovieItemV2 key={movie.id} movie={movie} />
          ))}
        </HomeLayout>
      </Container>
    </>
  );
}
