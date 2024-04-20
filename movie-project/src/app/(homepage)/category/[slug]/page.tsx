import categoryApi from "@/apis/category";
import moviesApi from "@/apis/movie";
import Header from "@/components/Global/Header";
import { MovieItemV3 } from "@/components/Global/MovieItem";
import HomeLayout from "@/components/Layouts/HomeLayout";
import { Heading, Text } from "@chakra-ui/react";

export default async function CategoryPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const categoryDetail = await categoryApi.detail(slug);
  const movies = await moviesApi.listByCategory(slug);

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
          <MovieItemV3 key={index} movie={movie} />
        ))}
      </HomeLayout>
    </>
  );
}
