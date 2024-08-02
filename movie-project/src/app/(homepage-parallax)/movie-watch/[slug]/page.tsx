import moviesApi from "@/apis/movie";
import { notFound } from "next/navigation";
import Cinema from "./Cinema";
import {
  Box,
  Container,
  GridItem,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import EpisodeList from "./EpisodeList";
import Comments from "../../(homepage)/movie-detail/[slug]/Comments";

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
      <Box mx={{ base: "0.5rem", md: "2rem" }} mt="6rem">
        <SimpleGrid columns={12} spacing="1rem" mb="1rem">
          <GridItem colSpan={{ base: 12, md: 9 }}>
            <Cinema
              currentEpisodeSlug={episodeDetail.data.slug}
              movieSource={episodeDetail.data.movie_sources}
              episodes={episodeDetail.data.movie.movie_episodes}
              movieSlug={episodeDetail.data.movie.slug}
              movieName={episodeDetail.data.movie.movie_name}
              episodeName={episodeDetail.data.episode_name}
              vtts={episodeDetail.data.subtitles.map(
                (caption) => caption.vtt_link
              )}
              createdAt={episodeDetail.data.created_at}
            />
          </GridItem>
          <GridItem colSpan={{ base: 12, md: 3 }}>
            <Tabs>
              <TabList fontSize="1rem">
                <Tab>DANH SÁCH TẬP</Tab>
                <Tab>TỪ VỰNG</Tab>
                <Tab>OVA</Tab>
              </TabList>
              <TabPanels>
                <EpisodeList
                  episodeList={episodeDetail.data.movie.movie_episodes}
                  currentSlug={params.slug}
                  episodeImage={episodeDetail.data.movie.movie_image}
                  movieName={episodeDetail.data.movie.movie_name}
                />
                <TabPanel>
                  <Text>
                    Từ vựng trong tập {episodeDetail.data.episode_name}
                  </Text>
                  <Stack mt={2}>
                    {episodeDetail.data.vocabularies.map(
                      (vocabulary, index) => (
                        <Text key={index}>
                          <Text as="b" mr={1}>
                            {vocabulary.vocabulary}
                          </Text>
                          <Text as="i">({vocabulary.part_of_speech})</Text>:{" "}
                          {vocabulary.meaning}
                        </Text>
                      )
                    )}
                  </Stack>
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
      </Box>
    </>
  );
}
