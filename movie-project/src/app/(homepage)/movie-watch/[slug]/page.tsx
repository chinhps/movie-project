import moviesApi from "@/apis/movie";
import Comment from "@/components/Global/Comments/Comment";
import Episode from "@/components/Global/Episode";
import {
  AspectRatio,
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  IconButton,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  FiChevronsRight,
  FiCornerDownRight,
  FiEyeOff,
  FiMeh,
  FiStar,
} from "react-icons/fi";
import Cinema from "./Cinema";

export default async function MovieWatchPage({
  params,
}: {
  params: { slug: string };
}) {
  const episodeDetail = await moviesApi.watch(params.slug);

  return (
    <>
      <Stack spacing={2}>
        <HStack
          justifyContent="space-between"
          rounded={10}
          bg="var(--bg-navbar)"
          p={5}
          color="var(--text-main)"
        >
          <Stack>
            <Heading as="h1" fontSize="20px">
              <Link href={"/movie-detail/" + episodeDetail.data.movie.slug}>
                {episodeDetail.data.movie.movie_name}
              </Link>
            </Heading>
            <Text>Đang xem tập {episodeDetail.data.episode_name}</Text>
          </Stack>
          <Stack align="end" fontSize="15px">
            <Text>Đăng 2 ngày trước</Text>
            <Text>Báo cáo</Text>
          </Stack>
        </HStack>
        <Cinema movieSource={episodeDetail.data.movie_sources} />
        <VStack align="start" mt={2} bg="white" rounded={5} p={5}>
          <Text as="b">Danh sách tập</Text>
          <HStack wrap="wrap" maxH="240px" overflowY="auto">
            {episodeDetail.data.movie.movie_episodes?.map((episode, index) => (
              <Episode
                key={index}
                text={episode.episode_name}
                episode={{
                  movieId: episodeDetail.data.movie.id,
                  slug: episode.slug,
                }}
                // slug={episode.slug}
              />
            ))}
          </HStack>
        </VStack>
        <CommentWatch />
      </Stack>
    </>
  );
}

function CommentWatch() {
  return (
    <>
      <Divider my={2} />
      <VStack spacing={3} align="start">
        <Text as="b">Bình luận (1000)</Text>
        <Flex
          w="100%"
          rounded="xl"
          overflow="hidden"
          height="130px"
          position="relative"
          bg="var(--bg-white)"
        >
          <Input
            py={5}
            px={5}
            height="55%"
            placeholder="Viết gì đó tại đây..."
            bg="var(--bg-white)"
          />
          <HStack
            justifyContent="space-between"
            position="absolute"
            bottom={3}
            left={3}
            right={3}
          >
            <HStack>
              <IconButton aria-label="send star" icon={<FiStar />} />
              <IconButton aria-label="sticker" icon={<FiMeh />} />
            </HStack>
            <IconButton
              aria-label="send comment"
              icon={<FiCornerDownRight />}
            />
          </HStack>
        </Flex>
      </VStack>
      <VStack bg="white" rounded={5} p={5}>
        <Comment />
        <Comment />
        <Comment />

        <Text mx="auto" fontSize="14px" mt={5} color="var(--bg-section)">
          Xem thêm bình luận...
        </Text>
      </VStack>
    </>
  );
}
