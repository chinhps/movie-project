import {
  Box,
  Center,
  Flex,
  HStack,
  Heading,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { FiPlay, FiStar } from "react-icons/fi";
import MovieBookmarkItem from "./MovieBookmarkItem";
import Link from "next/link";

export default function MovieItem() {
  return (
    <Box rounded="5px" overflow="hidden">
      <Box position="relative" height="260px" overflow="hidden">
        <Box position="absolute" right={3} top={0}>
          <MovieBookmarkItem />
        </Box>
        <Link href="/movie-detail/345354">
          <Box userSelect="none">
            <Image
              src="/images/movie.jpg"
              alt="movie item"
              width={300}
              height={300}
            />
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
            <MovieRate>20/25</MovieRate>
            <MovieRate icon={<FiStar />}>4.5</MovieRate>
          </Flex>
        </Link>
      </Box>
      <Link href="/movie-detail/345354">
        <Center bg="var(--bg-section)" py="7px">
          <Text color="var(--text-main)" fontSize="14px">
            Re: Monster
          </Text>
        </Center>
      </Link>
    </Box>
  );
}

export function MovieItemV3() {
  return (
    <Box rounded="xl" position="relative" height="320px" overflow="hidden">
      <Box position="absolute" right={3} top={0}>
        <MovieBookmarkItem />
      </Box>
      <Link href="/movie-detail/345354">
        <Box userSelect="none" boxShadow="md">
          <Image
            src="/images/movie.jpg"
            alt="movie item"
            width={300}
            height={300}
          />
        </Box>

        <Box
          position="absolute"
          bottom={2}
          right={2}
          left={2}
          bg="transparent"
          backdropFilter="blur(30px)"
          px={4}
          py={3}
          rounded="xl"
          color="var(--text-main)"
        >
          <HStack justifyContent="space-between">
            <Box>
              <Heading fontSize="16px">Re: Monster</Heading>
              <Stack direction="row" align="center" spacing={2} fontSize="13px">
                <Text>20/25</Text>
                <HStack>
                  <FiStar />
                  <Text>4.5</Text>
                </HStack>
              </Stack>
            </Box>
            <IconButton
              bg="var(--bg-title)"
              aria-label="play"
              icon={<FiPlay />}
              rounded="full"
            />
          </HStack>
        </Box>
      </Link>
    </Box>
  );
}

export function MovieItemV2({ watched }: { watched?: string }) {
  return (
    <Center py={3}>
      <Box
        role="group"
        p={2}
        maxW="330px"
        w="full"
        bg="white"
        boxShadow="md"
        rounded="lg"
        pos="relative"
        zIndex={1}
        px={3}
      >
        <Box
          rounded="lg"
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
            backgroundImage: `url(/images/movie.jpg)`,
            filter: "blur(10px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Box position="absolute" right={3} top={0}>
            <MovieBookmarkItem />
          </Box>
          <Link href="/movie-detail/345354">
            <Box rounded="md" overflow="hidden" height="240px">
              <Image height={200} width={282} src="/images/movie.jpg" alt="#" />
            </Box>
          </Link>
        </Box>
        <Stack pb={3} pt={5} align="center">
          <Stack direction="row" align="center" spacing={5}>
            <Text fontSize="15px">20/25</Text>
            <HStack>
              <FiStar />
              <Text color="gray.600">4.5</Text>
            </HStack>
          </Stack>
          <Link href="/movie-detail/345354">
            <Heading fontSize="18px" fontWeight={800}>
              Re: Monster
            </Heading>
          </Link>

          {watched && <Text fontSize="13px" color="var(--bg-gray)">{watched}</Text>}
        </Stack>
      </Box>
    </Center>
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
