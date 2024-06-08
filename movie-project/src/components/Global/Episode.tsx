"use client";

import { checkEpisode, numberFormat } from "@/libs/function";
import { IEpisodeProps } from "@/types/episode.type";
import { Box, Button, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Episode(props: IEpisodeProps) {
  const episodeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (checkEpisode(props.episode)) {
      if (episodeRef.current) {
        episodeRef.current.style.borderColor = "var(--bg-episode-watched)";
      }
    }
  }, [props.episode]);

  return (
    <Button
      as={Link}
      ref={episodeRef}
      href={props?.href ?? "/movie-watch/" + props.episode?.slug}
      variant="episode"
      isActive={props.active}
    >
      {props.text}
    </Button>
  );
}

interface IEpisodeWithImage {
  movieName: string;
  episodeName: string;
  views: number;
  episodeImage: string;
  slug: string;
}

export function EpisodeWithImage({
  movieName,
  episodeName,
  episodeImage,
  views,
  slug,
}: IEpisodeWithImage) {
  return (
    <>
      <Link href={"/movie-watch/" + slug}>
        <SimpleGrid columns={12} gap={2}>
          <GridItem colSpan={5} position="relative">
            <Box width="100%" height="65px" overflow="hidden">
              <Image
                src={episodeImage}
                alt={`${movieName} - Tập ${episodeName}`}
                width={200}
                height={140}
              />
            </Box>
          </GridItem>
          <GridItem
            colSpan={7}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Text fontSize="17px">Tập {episodeName} - sdfsdf</Text>
            <Text fontSize="14px" color="var(--bg-gray)">
              {numberFormat(views, false)} lượt xem
            </Text>
          </GridItem>
        </SimpleGrid>
      </Link>
    </>
  );
}
