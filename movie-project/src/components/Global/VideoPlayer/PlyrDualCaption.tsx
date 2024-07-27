"use client";

import { AspectRatio, Box, VStack } from "@chakra-ui/react";
import SubtitlesDesktop from "./SubtitlesDesktop";
import { useEffect, useRef } from "react";
import { useQueries } from "@tanstack/react-query";
import subtitleApi from "@/apis/subtitle";
import { parseVTT } from "./handelVideoPlayer";
import VideoPlayer from "../VideoPlayer";

export default function PlyrDualCaption({
  src,
  vttList,
}: {
  src: string;
  vttList: Array<string>;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Plyr | null>(null);
  const captionsRef = useRef<HTMLDivElement>(null);

  const vtts = useQueries({
    queries: vttList.map((vttUrl) => ({
      queryKey: ["post", vttUrl],
      queryFn: () => subtitleApi.vttDetail(vttUrl),
    })),
    combine: (results) => {
      return {
        data: results.map((result) => parseVTT(result.data ?? "")),
        pending: results.some((result) => result.isPending),
      };
    },
  });

  useEffect(() => {
    const plyrElement = playerRef.current?.elements.captions as HTMLElement;
    if (plyrElement) {
      if (captionsRef.current) {
        plyrElement.appendChild(captionsRef.current);
      }
    }
  }, [playerRef.current?.elements]);

  return (
    <>
      <Box position="relative">
        <AspectRatio height="100%" w="100%" _before={{}}>
          <VideoPlayer ref={videoRef} playerRef={playerRef} src={src} />
        </AspectRatio>
        <Box
          ref={captionsRef}
          position="absolute"
          left={0}
          right={0}
          bottom="8%"
          pointerEvents="none"
        >
          <VStack
            mx="auto"
            color="white"
            fontSize={{ base: "13px", md: "1.3rem" }}
            gap={1}
            userSelect="none"
            mb={{ base: "5px", md: "0.2rem" }}
          >
            {videoRef.current && vtts.data && (
              <SubtitlesDesktop
                dataVtts={vtts.data}
                videoElement={videoRef.current}
              />
            )}
          </VStack>
        </Box>
      </Box>
    </>
  );
}
