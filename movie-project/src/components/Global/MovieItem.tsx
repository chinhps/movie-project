import {
  Box,
  Center,
  Flex,
  HStack,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { FiStar } from "react-icons/fi";
import MovieBookmarkItem from "./MovieBookmarkItem";
import Link from "next/link";
import { IMovieResponse } from "@/types/response/movies.type";

export default function MovieItem({ movie }: { movie: IMovieResponse }) {
  return (
    <Box rounded="5px" overflow="hidden">
      <Box position="relative" height="260px" overflow="hidden">
        <Box position="absolute" right={3} top={0}>
          <MovieBookmarkItem slug={movie.slug} />
        </Box>
        <Link href={"/movie-detail/" + movie.slug}>
          <Box userSelect="none">
            <Image src={movie.movie_image} alt="movie item" fill={true} />
          </Box>
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
            <MovieRate>{`${movie.movie_episode_laster?.episode_name}/${movie.episodes_counter}`}</MovieRate>
            <MovieRate icon={<FiStar />}>
              {movie.movie_rate_avg_rate ?? "N/A"}
            </MovieRate>
          </Flex>
        </Link>
      </Box>
      <Link href={"/movie-detail/" + movie.slug}>
        <Center bg="var(--bg-section)" py="7px">
          <Text color="var(--text-main)" fontSize="14px" noOfLines={1}>
            {movie.movie_name}
          </Text>
        </Center>
      </Link>
    </Box>
  );
}

export function MovieItemV3({ movie }: { movie: IMovieResponse }) {
  return (
    <Box
      rounded="xl"
      position="relative"
      height={{ base: "250px", md: "320px" }}
      overflow="hidden"
    >
      <Box position="absolute" right={3} top={0}>
        <MovieBookmarkItem slug={movie.slug} />
      </Box>
      <Link href={"/movie-detail/" + movie.slug}>
        <Box userSelect="none" boxShadow="md">
          <Image
            src={movie.movie_image}
            alt="movie item"
            fill={true}
            loading="lazy"
          />
        </Box>
      </Link>
      <Box
        position="absolute"
        bottom={2}
        right={2}
        left={2}
        bg="var(--banner-description)"
        // backdropFilter="blur(20px)"
        px={4}
        py={3}
        rounded="xl"
        color="var(--text-main)"
      >
        <HStack justifyContent="space-between">
          <Link href={"/movie-detail/" + movie.slug}>
            <Heading fontSize="16px" noOfLines={1}>
              {movie.movie_name}
            </Heading>
            <Stack direction="row" align="center" spacing={2} fontSize="13px">
              <Text>{`${movie.movie_episode_laster?.episode_name}/${movie.episodes_counter}`}</Text>
              <HStack spacing={1}>
                <FiStar />
                <Text>{movie.movie_rate_avg_rate ?? "N/A"}</Text>
              </HStack>
            </Stack>
          </Link>
          <MovieBookmarkItem rounded="full" slug={movie.slug} />
        </HStack>
      </Box>
    </Box>
  );
}

export function MovieItemV2({
  watched,
  movie,
}: {
  watched?: string;
  movie: IMovieResponse;
}) {
  return (
    <Center py={3}>
      <Box
        role="group"
        p={2}
        w="full"
        bg="white"
        boxShadow="sm"
        rounded="lg"
        pos="relative"
        zIndex={1}
        px={3}
      >
        <Box
          rounded="xl"
          mt={-5}
          position="relative"
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 0,
            left: 0,
            backgroundImage: `url(${movie.movie_image})`,
            filter: "blur(2px)",
            zIndex: -1,
            borderRadius: "0.5rem"
          }}
          _groupHover={{
            _after: {
              filter: "blur(5px)",
            },
          }}
        >
          <Box position="absolute" right={3} top={0} zIndex={5}>
            <MovieBookmarkItem slug={movie.slug} />
          </Box>
          <Link href={"/movie-detail/" + movie.slug}>
            <Box height={{ base: "190px", md: "300px" }}>
              <Image
                style={{ borderRadius: "0.5rem" }}
                fill={true}
                src={movie.movie_image}
                alt="#"
                loading="lazy"
              />
            </Box>
          </Link>
        </Box>
        <Stack pb={3} pt={5} align="center">
          <Stack direction="row" align="center" spacing={5}>
            <Text fontSize="15px">{`${movie.movie_episode_laster?.episode_name}/${movie.episodes_counter}`}</Text>
            <HStack spacing={1}>
              <FiStar />
              <Text color="gray.600">{movie.movie_rate_avg_rate ?? "N/A"}</Text>
            </HStack>
          </Stack>
          <Link href={"/movie-detail/" + movie.slug}>
            <Heading fontSize="16px" fontWeight={800} noOfLines={1}>
              {movie.movie_name}
            </Heading>
          </Link>

          {watched && (
            <Text fontSize="13px" color="var(--bg-gray)">
              {watched}
            </Text>
          )}
        </Stack>
      </Box>
    </Center>
  );
}

MovieItemV2.skeleton = () => {
  return (
    <Center py={3}>
      <Box
        role="group"
        p={2}
        maxW="330px"
        w="full"
        bg="gray.200"
        boxShadow="sm"
        rounded="lg"
        pos="relative"
        zIndex={1}
      >
        <Box
          rounded="xl"
          mt={-5}
          position="relative"
          bg="gray.300"
          height="240px"
        ></Box>
        <Stack pb={3} pt={5} align="center">
          <Stack direction="row" align="center" spacing={5}>
            <Box width="70px" height="15px" bg="gray.300" />
            <Box width="35px" height="15px" bg="gray.300" />
          </Stack>
          <Box width="150px" height="20px" bg="gray.300" />
          <Box width="100px" height="13px" bg="gray.300" />
        </Stack>
      </Box>
    </Center>
  );
};

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
      fontSize="14px"
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
