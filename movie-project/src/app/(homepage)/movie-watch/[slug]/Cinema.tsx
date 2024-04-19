"use client";

import { IEpisodeSource } from "@/types/response/movies.type";
import { AspectRatio, Button, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FiChevronsRight, FiEyeOff } from "react-icons/fi";

export default function Cinema({
  movieSource,
}: {
  movieSource: Array<IEpisodeSource>;
}) {
  const [sourceActive, setSourceActive] = useState<IEpisodeSource>(() => {
    return movieSource[0];
  });

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
              key={index}
              variant={
                sourceActive == source
                  ? "mainButton"
                  : "secondButton"
              }
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
          <Button rightIcon={<FiChevronsRight />}>Tiếp theo</Button>
        </HStack>
      </HStack>
    </>
  );
}
