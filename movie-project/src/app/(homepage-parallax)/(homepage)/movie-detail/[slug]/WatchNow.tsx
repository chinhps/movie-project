"use client";

import { Button, ButtonProps } from "@chakra-ui/react";
import Link from "next/link";

export interface IWatchNowProps extends ButtonProps {
  children: React.ReactNode;
  slug: string;
}

export default function WatchNow({ children, slug, ...props }: IWatchNowProps) {
  return (
    <Button as={Link} href={"/movie-watch/" + slug} {...props}>
      {children}
    </Button>
  );
}
