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
import { FiFilm, FiMessageCircle, FiPlay } from "react-icons/fi";
import WatchNow from "./WatchNow";
import BookmarkButton from "./BookmarkButton";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import Comments from "@/components/Global/Comments/Comments";

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
        templateColumns="repeat(12,1fr)"
        gap={{ base: 0, md: 10 }}
        width="100%"
        rounded={5}
      >
        <GridItem colSpan={{ base: 12, md: 3 }}>
          <Box rounded="2xl" overflow="hidden">
            <Image
              src={movieDetail.data.movie_image}
              alt="movie avatar"
              width={400}
              height={700}
            />
          </Box>
          <HStack spacing={2} mt={5}>
            <BookmarkButton
              flex={1}
              variant="secondButton"
              slug={movieDetail.data.slug}
            >
              BOOKMARK
            </BookmarkButton>
            <Button
              flex={1}
              variant="secondButton"
              leftIcon={<FiMessageCircle />}
            >
              ĐÁNH GIÁ
            </Button>
          </HStack>
        </GridItem>
        <GridItem
          as={Flex}
          flexDirection="column"
          gap={3}
          colSpan={{ base: 12, md: 9 }}
        >
          <Heading as="h1" fontSize="30px" py={3}>
            {movieDetail.data.movie_name}
          </Heading>
          <HStack w="100%">
            <WatchNow
              flex={1}
              variant="mainButton"
              leftIcon={<FiPlay />}
              padding="1.5rem"
              rounded="full"
              maxWidth="350px"
              slug={movieDetail.data.movie_episodes?.at(-1)?.slug ?? ""}
            >
              XEM NGAY
            </WatchNow>
            <Button
              flex={1}
              variant="mainButton"
              leftIcon={<FiFilm />}
              padding="1.5rem"
              isDisabled={true}
              rounded="full"
              maxWidth="350px"
            >
              Trailer
            </Button>
          </HStack>
          <VStack spacing={5} align="start">
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
            <HStack w="100%" wrap="wrap" maxH="150px" overflowY="auto">
              {movieDetail.data.movie_episodes?.map((episode) => (
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
      <VStack spacing={3} align="start" bg="var(--bg-white)" rounded={5} my={5}>
        <Heading as="h2" fontSize="18px">
          Thông tin phim
        </Heading>
        <Text>{movieDetail.data.description}</Text>
      </VStack>
      <Comments slug={movieDetail.data.slug} />
    </Stack>
  );
}
