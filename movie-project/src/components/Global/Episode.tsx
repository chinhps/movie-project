"use client";

import { checkEpisode } from "@/libs/function";
import { IEpisodeProps } from "@/types/episode.type";
import { Button } from "@chakra-ui/react";
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
