import moviesApi from "@/apis/movie";
import { notFound } from "next/navigation";
import Cinema from "./Cinema";
import {
  Box,
  Divider,
  GridItem,
  Heading,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import { EpisodeWithImage } from "@/components/Global/Episode";
import Comments from "../../movie-detail/[slug]/Comments";

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
      <SimpleGrid columns={12} spacing="1rem" mb="1rem">
        <GridItem colSpan={{ base: 12, md: 9 }}>
          <Cinema
            currentEpisodeSlug={episodeDetail.data.slug}
            movieSource={episodeDetail.data.movie_sources}
            episodes={episodeDetail.data.movie.movie_episodes}
            movieSlug={episodeDetail.data.movie.slug}
            movieName={episodeDetail.data.movie.movie_name}
            episodeName={episodeDetail.data.episode_name}
          />
        </GridItem>
        <GridItem colSpan={{ base: 12, md: 3 }}>
          <Tabs>
            <TabList fontSize="1rem">
              <Tab as="h2">DANH SÁCH TẬP</Tab>
              <Tab>OVA</Tab>
            </TabList>
            <TabPanels>
              <TabPanel as={Stack} gap={2} maxH="650px" overflow="auto" mt={1}>
                {episodeDetail.data.movie.movie_episodes?.map((episode) => (
                  <EpisodeWithImage
                    key={episode.slug}
                    episodeImage={episodeDetail.data.movie.movie_image}
                    episodeName={episode.episode_name}
                    movieName={episodeDetail.data.movie.movie_name}
                    slug={episode.slug}
                    views={1000000}
                  />
                ))}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>
      </SimpleGrid>
      <SimpleGrid columns={12} spacing="1rem" mb="1rem">
        <GridItem colSpan={{ base: 12, md: 9 }}>
          <Comments slug={episodeDetail.data.movie.slug} />
        </GridItem>
      </SimpleGrid>
    </>
  );
}
