"use client";

import { EpisodeWithImage } from "@/components/Global/Episode";
import { IEpisode } from "@/types/response/movies.type";
import { Stack, TabPanel } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

export default function EpisodeList({
  episodeList,
  episodeImage,
  movieName,
  currentSlug,
}: {
  episodeList?: Array<IEpisode>;
  episodeImage: string;
  movieName: string;
  currentSlug: string;
}) {
  const activeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeRef.current) {
      const container = activeRef.current.closest(".episode-list");
      if (container) {
        const elementRect = activeRef.current.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.scrollY;
        const middle = absoluteElementTop - window.innerHeight / 2;
        container.scrollTop = middle;
      }
    }
  }, [currentSlug]);

  return (
    <>
      <TabPanel
        className="episode-list"
        as={Stack}
        gap={1}
        maxH={{ base: "400px", md: "850px" }}
        overflow="auto"
        mt={2}
        p={0}
      >
        {episodeList?.map((episode) => (
          <EpisodeWithImage
            ref={episode.slug === currentSlug ? activeRef : null}
            key={episode.slug}
            active={episode.slug === currentSlug}
            episodeImage={episodeImage}
            episodeName={episode.episode_name}
            movieName={movieName}
            slug={episode.slug}
            views={1000000}
          />
        ))}
      </TabPanel>
    </>
  );
}
