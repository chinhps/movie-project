import moviesApi from "@/apis/movie";
import Header from "@/components/Global/Header";
import { MovieItemV3 } from "@/components/Global/MovieItem";
import Paginate from "@/components/Global/Paginate";
import HomeLayout from "@/components/Layouts/HomeLayout";
import { Heading, Text } from "@chakra-ui/react";

export default async function MovieLatestPage({
  searchParams: { page },
}: {
  searchParams: { page: number | undefined };
}) {
  const moviesLatest = await moviesApi.latest({ page });

  return (
    <>
      <Heading as="h2" fontSize="13px" my={2}>
        Danh mục
      </Heading>
      <Header>ANIME MỚI CẬP NHẬT</Header>
      <Text fontSize="15px" my={2}>
        Phim được cập nhật liên tục!
      </Text>
      <HomeLayout>
        {moviesLatest.data.map((movie) => (
          <MovieItemV3 key={movie.id} movie={movie} />
        ))}
      </HomeLayout>
      {moviesLatest.paginate && (
        <Paginate
          pageLink={"/movie-latest"}
          currentPage={moviesLatest.paginate.current_page}
          totalPage={moviesLatest.paginate.last_page}
        />
      )}
    </>
  );
}
