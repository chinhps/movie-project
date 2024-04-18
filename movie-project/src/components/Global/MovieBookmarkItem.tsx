"use client";

import { Box, BoxProps } from "@chakra-ui/react";
import { useState } from "react";
import { FiBookmark } from "react-icons/fi";

interface IMovieBookmark extends BoxProps {}

export default function MovieBookmarkItem({ ...props }: IMovieBookmark) {
  const [active, setActive] = useState(false);
  return (
    <Box
      py={3}
      px={3}
      cursor="pointer"
      roundedBottom="5px"
      bg={active ? "var(--bg-section)" : "var(--bg-main)"}
      color={active ? "var(--bg-main)" : "var(--bg-section)"}
      onClick={() => setActive((prev) => !prev)}
      {...props}
    >
      <FiBookmark />
    </Box>
  );
}
