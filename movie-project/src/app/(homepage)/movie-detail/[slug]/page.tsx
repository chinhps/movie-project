import moviesApi from "@/apis/movie";
import Episode from "@/components/Global/Episode";
import TagCustom from "@/components/Global/TagCustom";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { FiHeart } from "react-icons/fi";
import Comments from "./Comments";
import WatchNow from "./WatchNow";
import BookmarkButton from "./BookmarkButton";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

export default async function MovieDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const session = await auth();
  const movieDetail = await moviesApi.detail(params.slug, session?.user.token);

  if (typeof movieDetail.data === "undefined") {
    return notFound();
  }

  return (
    <Stack gap={3}>
      <Grid
        templateColumns="repeat(5,1fr)"
        gap={5}
        bg="white"
        rounded={5}
        p={5}
      >
        <GridItem colSpan={{ base: 5, md: 1 }}>
          <Box rounded="md" overflow="hidden">
            <Image
              src={movieDetail.data.movie_image}
              alt="movie avatar"
              width={400}
              height={700}
            />
          </Box>
          <VStack spacing={2} mt={2}>
            <WatchNow
              slug={movieDetail.data.movie_episodes?.at(-1)?.slug ?? ""}
            >
              XEM NGAY
            </WatchNow>
            <BookmarkButton slug={movieDetail.data.slug}>
              BOOKMARK
            </BookmarkButton>
            <Button
              variant="secondButton"
              w="100%"
              padding="23px 0"
              leftIcon={<FiHeart />}
            >
              ĐÁNH GIÁ
            </Button>
          </VStack>
        </GridItem>
        <GridItem
          as={Flex}
          flexDirection="column"
          gap={3}
          colSpan={{ base: 5, md: 4 }}
        >
          <Heading as="h1" fontSize="30px">
            {movieDetail.data.movie_name}
          </Heading>
          <VStack spacing={4} align="start">
            <Flex gap={4}>
              <Text as="b">Tên khác</Text> {movieDetail.data.movie_name}
            </Flex>
            <Flex gap={4}>
              <Text as="b" flex="none">
                Thể loại
              </Text>{" "}
              <Flex flexWrap="wrap" gap={1}>
                {movieDetail.data.categories?.map((category, index) => (
                  <TagCustom key={category.slug} text={category.name} />
                ))}
              </Flex>
            </Flex>
            <Flex gap={4}>
              <Text as="b">Trạng thái</Text>{" "}
              {movieDetail.data.episodes_counter <=
              movieDetail.data.movie_episodes_count
                ? "Đã hoàn thành"
                : "Đang thực hiện"}
            </Flex>
            <Flex gap={4}>
              <Text as="b">Điểm</Text> {movieDetail.data.movie_rate_avg_rate} ||{" "}
              {movieDetail.data.movie_rate_count} Đánh giá
            </Flex>
            <Flex gap={4}>
              <Text as="b">Phát hành</Text> {movieDetail.data.release}
            </Flex>
            <Flex gap={4}>
              <Text as="b">Thời lượng</Text> {movieDetail.data.episodes_counter}{" "}
              Tập
            </Flex>
          </VStack>

          {/* <VStack align="start" mt={2}>
            <Text as="b">Phim liên kết</Text>
            <HStack>
              <Episode text="Huhu haha meem" />
              <Episode text="123" />
              <Episode text="123" />
            </HStack>
          </VStack> */}
          <VStack align="start" mt={2}>
            <Text as="b">
              Danh sách tập ({movieDetail.data.movie_episodes?.length} tập)
            </Text>
            <HStack wrap="wrap" maxH="150px" overflowY="auto">
              {movieDetail.data.movie_episodes?.map((episode, index) => (
                <Episode
                  key={episode.slug}
                  text={episode.episode_name}
                  episode={{ movieId: movieDetail.data.id, slug: episode.slug }}
                  // slug={episode.slug}
                />
              ))}
            </HStack>
          </VStack>
        </GridItem>
      </Grid>
      <VStack spacing={3} align="start" bg="var(--bg-white)" rounded={5} p={5}>
        <Heading as="h2" fontSize="18px">
          Thông tin phim
        </Heading>
        <Text>{movieDetail.data.description}</Text>
      </VStack>
      <Comments slug={movieDetail.data.slug} />
    </Stack>
  );
}
