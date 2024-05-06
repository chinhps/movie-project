"use client";

import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useRef } from "react";

export interface IEpisodeProps {
  text: string | number;
  href?: string;
  slug?: string;
  episode: IEpisodeHistory;
}

export interface IEpisodeHistory {
  movieId?: number;
  slug?: string;
}

export const saveEpisode = (episode: IEpisodeHistory) => {
  const localHistories: Array<IEpisodeHistory> = JSON.parse(
    localStorage.getItem("movie-history") ?? "[]"
  );
  if (!checkEpisode(episode)) {
    const newHistory: Array<IEpisodeHistory> = [
      ...localHistories,
      {
        movieId: episode.movieId,
        slug: episode.slug,
      },
    ];
    localStorage.setItem("movie-history", JSON.stringify(newHistory));
  }
};

const checkEpisode = (episode: IEpisodeHistory) => {
  const localHistories: Array<IEpisodeHistory> = JSON.parse(
    localStorage?.getItem("movie-history") ?? "[]"
  );
  return localHistories.find((elm) => elm.slug === episode.slug);
};

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
      onClick={() => saveEpisode(props.episode)}
    >
      {props.text}
    </Button>
  );
}
