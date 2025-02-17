"use client";

import { checkEpisode, numberFormat } from "@/libs/function";
import { IEpisodeProps } from "@/types/episode.type";
import { Box, Button, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { forwardRef, useEffect, useRef } from "react";

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
      {props.text.toString().split("-")[0] ?? props.text}
    </Button>
  );
}

interface IEpisodeWithImage {
  movieName: string;
  episodeName: string;
  views: number;
  episodeImage: string;
  slug: string;
  active?: boolean;
}

const EpisodeWithImage = forwardRef<HTMLDivElement, IEpisodeWithImage>(
  ({ movieName, episodeName, episodeImage, views, slug, active }, ref) => {
    return (
      <>
        <Link href={"/movie-watch/" + slug}>
          <SimpleGrid
            ref={ref}
            columns={12}
            gap={2}
            p={1}
            alignItems="center"
            bg={active ? "var(--episode-hover)" : ""}
            rounded="lg"
            _hover={{
              bg: "var(--episode-hover)",
            }}
          >
            <GridItem colSpan={5} position="relative">
              <Box width="100%" height="90px" rounded="md" overflow="hidden">
                <Image
                  src={episodeImage}
                  alt={`${movieName} - Tập ${episodeName}`}
                  width={200}
                  height={150}
                  style={{ objectFit: "cover" }}
                />
              </Box>
            </GridItem>
            <GridItem
              colSpan={7}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              {active && (
                <Text fontSize="13px" color="var(--bg-gray)">
                  Đang xem
                </Text>
              )}
              <Text fontSize="17px" noOfLines={2}>Tập {episodeName}</Text>
              <Text fontSize="14px" color="var(--bg-gray)">
                {numberFormat(views, false)} lượt xem
              </Text>
            </GridItem>
          </SimpleGrid>
        </Link>
      </>
    );
  }
);

EpisodeWithImage.displayName = "EpisodeWithImage";

export { EpisodeWithImage };
