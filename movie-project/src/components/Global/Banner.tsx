"use client";

import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { Box, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import { FiChevronRight, FiFilm, FiStar } from "react-icons/fi";

export default function Banner() {
  const settings: Settings = {
    dots: false,
    autoplay: true,
    arrows: false
  };
  return (
    <Box className="image-slider-container" boxShadow="md">
      <Slider {...settings}>
        <BannerItem />
        <BannerItem />
        <BannerItem />
        <BannerItem />
      </Slider>
    </Box>
  );
}

export function BannerItem() {
  return (
    <Box position="relative" maxH="350px">
      <Image
        src="/images/banner.png"
        width={1500}
        height={300}
        alt="banner for anime"
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
          Kimetsu no Yaiba Hashira Training Arc, Thanh Gươm Diệt Quỷ Phần 4: Đặc
          biệt
        </Heading>
        <HStack justifyContent="space-between">
          <HStack spacing="3rem">
            <HStack>
              <FiFilm />
              <Text>20/25</Text>
            </HStack>
            <HStack>
              <FiStar />
              <Text>4.5</Text>
            </HStack>
          </HStack>
          <HStack fontSize="15px">
            <Text>Xem thêm</Text>
            <FiChevronRight />
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );
}
