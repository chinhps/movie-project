import moviesApi from "@/apis/movie";
import Header from "@/components/Global/Header";
import { MovieItemV3 } from "@/components/Global/MovieItem";
import Paginate from "@/components/Global/Paginate";
import HomeLayout from "@/components/Layouts/HomeLayout";
import { Heading, Text } from "@chakra-ui/react";

export default async function MovieSearch({
  searchParams: { name, page },
}: {
  searchParams: { name: string; page: number };
}) {
  const movies = await moviesApi.list({
    page,
    params: {
      name,
    },
  });

  return (
    <>
      <Heading as="h2" fontSize="13px" my={2}>
        Tìm kiếm
      </Heading>
      <Header>TỪ KHÓA: {name}</Header>
      <Text fontSize="15px" my={2}>
        Dưới đây là danh sách phim có liên quan tới từ khóa bạn tìm kiếm!
      </Text>
      <Text fontSize="15px" my={2}>
        Bạn có thể tìm kiếm tên phim trên tìm kiếm bằng: TÊN PHIM + BRANDNAME
      </Text>
      <HomeLayout>
        {movies.data.map((movie) => (
          <MovieItemV3 key={movie.id} movie={movie} />
        ))}
      </HomeLayout>
      {movies.paginate && (
        <Paginate
          pageLink={"/movie-search?name=" + name}
          currentPage={movies.paginate.current_page}
          totalPage={movies.paginate.last_page}
        />
      )}
    </>
  );
}
