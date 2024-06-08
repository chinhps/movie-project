"use client";

import { numberFormat, saveEpisode } from "@/libs/function";
import { IEpisode, IEpisodeSource } from "@/types/response/movies.type";
import {
  AspectRatio,
  Box,
  Button,
  HStack,
  Heading,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiChevronsRight, FiEyeOff, FiFlag } from "react-icons/fi";
import BookmarkButton from "../../movie-detail/[slug]/BookmarkButton";
import Link from "next/link";

export default function Cinema({
  movieSource,
  episodes,
  currentEpisodeSlug,
  movieName,
  episodeName,
  movieSlug,
}: {
  movieSource: Array<IEpisodeSource>;
  episodes?: Array<IEpisode>;
  currentEpisodeSlug: string;
  movieName: string;
  episodeName: string;
  movieSlug: string;
}) {
  const router = useRouter();
  const toast = useToast();
  const [sourceActive, setSourceActive] = useState<IEpisodeSource>(() => {
    return movieSource[0];
  });

  const handleNextMovie = () => {
    if (episodes) {
      const current = episodes.findIndex(
        (episode) => episode.slug === currentEpisodeSlug
      );
      if (typeof episodes[current + 1] !== "undefined") {
        router.push("/movie-watch/" + episodes[current + 1].slug);
        return;
      }
      toast({
        description: "Bạn đang ở tập mới nhất rồi!",
      });
    }
  };

  useEffect(() => {
    saveEpisode({
      movieId: 0,
      slug: currentEpisodeSlug,
    });
  }, [currentEpisodeSlug]);

  return (
    <>
      <Box>
        <AspectRatio rounded={10} overflow="hidden" ratio={16 / 9} bg="black">
          <iframe
            src={sourceActive?.source_link}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen={true}
          ></iframe>
        </AspectRatio>
        <Box my={2} textAlign={{ base: "center", md: "left" }}>
          <Heading
            as="h1"
            textTransform="uppercase"
            fontSize="1.5rem"
            lineHeight="2.8rem"
            fontWeight={700}
          >
            <Link href={"/movie-detail/" + movieSlug}>{movieName} </Link>- Tập{" "}
            {episodeName}
          </Heading>
          <Text color="var(--color-gray)">
            {numberFormat(10000000, false)} Lượt xem
          </Text>
        </Box>

        <HStack
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="space-between"
          mt="0.5rem"
        >
          <HStack>
            {movieSource.map((source) => (
              <Button
                key={source.source_link}
                variant={sourceActive == source ? "mainButton" : "secondButton"}
                onClick={() => setSourceActive(source)}
              >
                {source.server_name}
              </Button>
            ))}
          </HStack>

          <HStack>
            <BookmarkButton slug={movieSlug} />
            <IconButton icon={<FiFlag />} aria-label="report video" />
            <Button rightIcon={<FiChevronsRight />} onClick={handleNextMovie}>
              Tiếp theo
            </Button>
          </HStack>
        </HStack>
      </Box>
    </>
  );
}
