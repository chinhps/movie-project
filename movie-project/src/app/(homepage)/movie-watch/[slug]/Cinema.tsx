"use client";

import { saveEpisode } from "@/libs/function";
import { IEpisode, IEpisodeSource } from "@/types/response/movies.type";
import { AspectRatio, Button, HStack, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiChevronsRight, FiEyeOff } from "react-icons/fi";

export default function Cinema({
  movieSource,
  episodes,
  currentEpisodeSlug,
}: {
  movieSource: Array<IEpisodeSource>;
  episodes?: Array<IEpisode>;
  currentEpisodeSlug: string;
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
      <AspectRatio rounded={10} overflow="hidden" ratio={16 / 9} bg="black">
        <iframe
          src={sourceActive?.source_link}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen={true}
        ></iframe>
      </AspectRatio>

      <HStack justifyContent="space-between" mt={1}>
        <HStack>
          {movieSource.map((source, index) => (
            <Button
              key={source.source_link}
              variant={sourceActive == source ? "mainButton" : "secondButton"}
              onClick={() => setSourceActive(source)}
            >
              {source.server_name}
            </Button>
          ))}
        </HStack>
        <Text fontSize="13px">
          Lưu lại hoặc nhớ link thông báo: BRANDNAME.com để có thể truy cập web
          khi nhà mạng chặn!
        </Text>
        <HStack>
          <Button variant="secondButton" rightIcon={<FiEyeOff />}>
            Remove Ads
          </Button>
          <Button rightIcon={<FiChevronsRight />} onClick={handleNextMovie}>
            Tiếp theo
          </Button>
        </HStack>
      </HStack>
    </>
  );
}
