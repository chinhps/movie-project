"use client";

import { Box, Text } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import Scrollbar from "smooth-scrollbar";

const speed = 0.04;

function Banner() {
  const bannerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // const scrollbar = Scrollbar.init(document.body);

    const handelParallaxBackground = () => {
      if (bannerRef.current) {
        const yOffset = window.scrollY * speed;
        console.log(yOffset);
        bannerRef.current.style.backgroundPosition = `50% ${50 + yOffset}%`;
      }
    };
    document.addEventListener("scroll", handelParallaxBackground);

    return () => {
      document.removeEventListener("scroll", handelParallaxBackground);
    };
  }, []);

  return (
    <Box position="relative">
      <Box h={{ base: "200px", md: "400px" }}>
        <Text>sdfsdfsds</Text>
      </Box>
      <Box
        ref={bannerRef}
        position="absolute"
        backgroundImage="https://i.imgur.com/eQHPIqV.png"
        backgroundSize="inherit"
        backgroundPosition="center"
        h={{ base: "500px", md: "650px" }}
        inset={0}
      />
    </Box>
  );
}

export default Banner;
