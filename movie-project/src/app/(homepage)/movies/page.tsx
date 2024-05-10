import moviesApi from "@/apis/movie";
import Header from "@/components/Global/Header";
import { MovieItemV3 } from "@/components/Global/MovieItem";
import HomeLayout from "@/components/Layouts/HomeLayout";
import { Heading, Text } from "@chakra-ui/react";

export default async function MoviesPage() {
  const movies = await moviesApi.list({});

  return (
    <>
      <Heading as="h2" fontSize="13px" my={2}>
        Danh mục
      </Heading>
      <Header>Tất cả phim | BRANDNAME</Header>
      <Text fontSize="15px" my={2}>
        Bạn có thể tìm kiếm phim trên Google (Tên phim + BRANDNAME). Bạn có thể
        xem phim với trải nghiệm mượt và giao diện thân thiện.
      </Text>
      <HomeLayout>
        {movies.data.map((movie, index) => (
          <MovieItemV3 key={movie.id} movie={movie} />
        ))}
      </HomeLayout>
    </>
  );
}
