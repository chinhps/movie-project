"use client";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { FiFilm } from "react-icons/fi";

export interface IWatchNowProps {
  children: React.ReactNode;
  slug: string;
}

export default function WatchNow({ children, slug, ...props }: IWatchNowProps) {
  return (
    <Button
      as={Link}
      href={"/movie-watch/" + slug}
      variant="mainButton"
      w="100%"
      padding="23px 0"
      leftIcon={<FiFilm />}
    >
      {children}
    </Button>
  );
}
