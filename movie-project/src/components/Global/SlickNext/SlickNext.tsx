"use client";

import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IBaseResponse } from "@/types/base.type";
import { IMovieResponse } from "@/types/response/movies.type";
import { Box, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { FiChevronRight, FiFilm, FiStar } from "react-icons/fi";
import Link from "next/link";

const settings: Settings = {
  dots: false,
  autoplay: true,
  arrows: false,
};

export default function SlickNext({
  data,
}: {
  data: IBaseResponse<IMovieResponse>;
}) {
  return (
    <Box className="image-slider-container" boxShadow="md">
      <Slider {...settings}>
        {data.data.map((banner) => (
          <BannerItem key={banner.id} {...banner} />
        ))}
      </Slider>
    </Box>
  );
}

export function BannerItem(data: IMovieResponse) {
  return (
    <Box position="relative" h={{ base: "200px", md: "350px" }}>
      <Image
        style={{ objectFit: "cover" }}
        src={data.banner_image}
        fill
        alt={data.movie_name}
      />
      <VStack
        align="stretch"
        position="absolute"
        p={5}
        bottom={0}
        left={0}
        bg="var(--banner-description)"
        color="var(--text-main)"
      >
        <Heading as="h1" fontSize="1rem">
          {data.movie_name}
        </Heading>
        <HStack justifyContent="space-between" gap="2rem">
          <HStack spacing="1rem">
            <HStack>
              <FiFilm />
              <Text>{`${data.movie_episode_laster?.episode_name}/${data.episodes_counter}`}</Text>
            </HStack>
            <HStack>
              <FiStar />
              <Text>{data.movie_rate_avg_rate ?? "N/A"}</Text>
            </HStack>
          </HStack>
          <HStack as={Link} href={"/movie-detail/" + data.slug} fontSize="15px">
            <Text>Xem thêm</Text>
            <FiChevronRight />
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );
}
