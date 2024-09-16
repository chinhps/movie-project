import moviesApi from "@/apis/movie";
import Header from "@/components/Global/Header";
import { MovieItemV2 } from "@/components/Global/MovieItem";
import Paginate from "@/components/Global/Paginate";
import HomeLayout from "@/components/Layouts/HomeLayout";
import { Heading, Text } from "@chakra-ui/react";

export default async function MoviesPage({
  searchParams: { page },
}: {
  searchParams: { page: number | undefined };
}) {
  const movies = await moviesApi.list({ page });

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
          <MovieItemV2 key={movie.id} movie={movie} />
        ))}
      </HomeLayout>
      {movies.paginate && (
        <Paginate
          pageLink={"/movies"}
          currentPage={movies.paginate.current_page}
          totalPage={movies.paginate.last_page}
        />
      )}
    </>
  );
}
