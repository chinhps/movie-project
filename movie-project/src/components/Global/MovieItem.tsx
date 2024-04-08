import { Box, Center, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { FiStar } from "react-icons/fi";
import MovieBookmarkItem from "./MovieBookmarkItem";

export default function MovieItem() {
  return (
    <Box rounded="5px" overflow="hidden">
      <Box position="relative" height="280px" overflow="hidden">
        <Box position="absolute" right={3} top={0}>
          <MovieBookmarkItem />
        </Box>
        <Image
          src="/images/movie.jpg"
          alt="movie item"
          width={300}
          height={300}
        />
        <Box
          bg="var(--gradient-movie)"
          position="absolute"
          inset={0}
          top="50%"
        />
        <Flex
          justify="space-between"
          position="absolute"
          bottom={3}
          left={3}
          right={3}
        >
          <MovieRate>20/25</MovieRate>
          <MovieRate icon={<FiStar />}>4.5</MovieRate>
        </Flex>
      </Box>
      <Center bg="var(--bg-section)" py="7px">
        <Text color="var(--text-main)">Re: Monster</Text>
      </Center>
    </Box>
  );
}

function MovieRate({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <Flex
      py={1}
      px={4}
      gap={1}
      alignItems="center"
      bg="var(--bg-section)"
      userSelect="none"
      color="var(--text-main)"
      rounded={2}
    >
      {icon}
      <Text fontWeight="medium">{children}</Text>
    </Flex>
  );
}
