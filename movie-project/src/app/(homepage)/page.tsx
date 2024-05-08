import bookmarkApi from "@/apis/bookmark";
import moviesApi from "@/apis/movie";
import { auth } from "@/auth";
import Banner from "@/components/Global/Banner";
import Header from "@/components/Global/Header";
import MovieItem, {
  MovieItemV2,
  MovieItemV3,
} from "@/components/Global/MovieItem";
import HomeLayout from "@/components/Layouts/HomeLayout";
import Link from "next/link";
import Bookmarks from "./Bookmarks";

export default async function Home() {
  const moviesLatest = await moviesApi.latest();
  const moviesRanking = await moviesApi.rankings();
  const moviesList = await moviesApi.rankings();

  return (
    <>
      <Bookmarks />
      <Banner />
      <Header mb={3} mt={5} rightLink={<Link href="/sdfsd">Xem tất cả</Link>}>
        ANIME MỚI CẬP NHẬT
      </Header>
      <HomeLayout mt={5}>
        {moviesLatest.data.map((movie, index) => (
          <MovieItemV2 key={index} movie={movie} />
        ))}
      </HomeLayout>
      <Header mb={3} mt={5}>
        BẢNG XẾP HẠNG
      </Header>
      <HomeLayout>
        {moviesRanking.data.map((movie, index) => (
          <MovieItemV3 key={index} movie={movie} />
        ))}
      </HomeLayout>
      <Header mb={3} mt={5} rightLink={<Link href="/movies">Xem tất cả</Link>}>
        TẤT CẢ PHIM
      </Header>
      <HomeLayout>
        {moviesList.data.map((movie, index) => (
          <MovieItem key={index} movie={movie} />
        ))}
      </HomeLayout>
    </>
  );
}
