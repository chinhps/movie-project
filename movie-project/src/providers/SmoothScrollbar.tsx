"use client";

import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import Scrollbar from "smooth-scrollbar";
import { ScrollbarOptions } from "smooth-scrollbar/interfaces";

const options: Partial<ScrollbarOptions> = {
  damping: 0.06,
  alwaysShowTracks: false,
  continuousScrolling: false,
};

export default function SmoothScrollbarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // useEffect(() => {
  //   Scrollbar.init(document.body, options);
  //   window.scroll({ top: 0 });
  // }, []);

  return <Box>{children}</Box>;
}
