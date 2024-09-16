import categoryApi from "@/apis/category";
import moviesApi from "@/apis/movie";
import Header from "@/components/Global/Header";
import { MovieItemV2 } from "@/components/Global/MovieItem";
import Paginate from "@/components/Global/Paginate";
import HomeLayout from "@/components/Layouts/HomeLayout";
import { Heading, Text } from "@chakra-ui/react";
import { notFound } from "next/navigation";

export default async function CategoryPage({
  params: { slug },
  searchParams: { page },
}: {
  params: { slug: string };
  searchParams: { page: number | undefined };
}) {
  const categoryDetail = await categoryApi.detail(slug);
  const movies = await moviesApi.listByCategory(slug, page);

  if (typeof categoryDetail.data === "undefined") {
    return notFound();
  }

  return (
    <>
      <Heading as="h2" fontSize="13px" my={2}>
        Danh mục
      </Heading>
      <Header>{categoryDetail.data.name}</Header>
      <Text fontSize="15px" my={2}>
        {categoryDetail.data.description}
      </Text>
      <HomeLayout>
        {movies.data.map((movie, index) => (
          <MovieItemV2 key={movie.id} movie={movie} />
        ))}
      </HomeLayout>
      {movies.paginate && (
        <Paginate
          pageLink={"/category/" + slug}
          currentPage={movies.paginate.current_page}
          totalPage={movies.paginate.last_page}
        />
      )}
    </>
  );
}
