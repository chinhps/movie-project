import moviesApi from "@/apis/movie";
import Comment from "@/components/Global/Comments/Comment";
import Episode from "@/components/Global/Episode";
import TagCustom from "@/components/Global/TagCustom";
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  IconButton,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import {
  FiCornerDownRight,
  FiFilm,
  FiHeart,
  FiMeh,
  FiStar,
} from "react-icons/fi";
import Comments from "./Comments";
import WatchNow from "./WatchNow";

export default async function MovieDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const movieDetail = await moviesApi.detail(params.slug);

  return (
    <Stack gap={3}>
      <Grid
        templateColumns="repeat(4,1fr)"
        gap={5}
        bg="white"
        rounded={5}
        p={5}
      >
        <GridItem colSpan={1}>
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
            <Button
              variant="secondButton"
              w="100%"
              padding="23px 0"
              leftIcon={<FiHeart />}
            >
              BOOKMARK
            </Button>
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
        <GridItem as={Flex} flexDirection="column" gap={3} colSpan={3}>
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
                  <TagCustom key={index} text={category.name} />
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
                  key={index}
                  text={episode.episode_name}
                  episode={{ movieId: movieDetail.data.id, slug: episode.slug }}
                  // slug={episode.slug}
                />
              ))}
            </HStack>
          </VStack>
        </GridItem>
      </Grid>
      <VStack spacing={3} align="start" bg="white" rounded={5} p={5}>
        <Heading as="h2" fontSize="23px">
          Thông tin phim
        </Heading>
        <Text>{movieDetail.data.description}</Text>
      </VStack>
      <Divider mt={2} color="gray.100" />
      <Comments slug={movieDetail.data.slug} />
    </Stack>
  );
}
