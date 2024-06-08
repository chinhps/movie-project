import moviesApi from "@/apis/movie";
import Episode from "@/components/Global/Episode";
import {
  Divider,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";

import Cinema from "./Cinema";
import Comments from "../../movie-detail/[slug]/Comments";
import { notFound } from "next/navigation";

export default async function MovieWatchPage({
  params,
}: {
  params: { slug: string };
}) {
  const episodeDetail = await moviesApi.watch(params.slug);
  if (typeof episodeDetail.data === "undefined") {
    return notFound();
  }

  return (
    <>
      <Stack spacing={2}>
        <HStack
          justifyContent="space-between"
          rounded={10}
          bg="var(--bg-main-second)"
          px={6}
          py={4}
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
        <Cinema
          currentEpisodeSlug={episodeDetail.data.slug}
          movieSource={episodeDetail.data.movie_sources}
          episodes={episodeDetail.data.movie.movie_episodes}
          movieSlug={episodeDetail.data.movie.slug}
          movieName={episodeDetail.data.movie.movie_name}
          episodeName={episodeDetail.data.episode_name}
        />
        <VStack align="start" mt={2} bg="white" rounded={5} p={5}>
          <Text as="b">Danh sách tập</Text>
          <HStack wrap="wrap" maxH="240px" overflowY="auto">
            {episodeDetail.data.movie.movie_episodes?.map((episode, index) => (
              <Episode
                key={episode.slug}
                active={episode.slug === episodeDetail.data.slug}
                text={episode.episode_name}
                episode={{
                  movieId: episodeDetail.data.movie.id,
                  slug: episode.slug,
                }}
              />
            ))}
          </HStack>
        </VStack>
        <Divider mt={2} color="gray.100" />
        <Comments slug={episodeDetail.data.movie.slug} />
      </Stack>
    </>
  );
}
