"use client";

import useDeviceCheck from "@/hooks/useDeviceCheck";
import { Box, Container, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import Scrollbar from "smooth-scrollbar";

const speed = 0.06;

function Banner() {
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const checkDevice = useDeviceCheck();
  useEffect(() => {
    // const scrollbar = Scrollbar.init(document.body);

    const handelParallaxBackground = () => {
      if (bannerRef.current) {
        const yOffset = window.scrollY * speed;
        if (checkDevice == "mobile") {
          bannerRef.current.style.backgroundPosition = `${50 + yOffset * 2}% 50%`;
        } else {
          bannerRef.current.style.backgroundPosition = `50% ${50 + yOffset}%`;
        }
      }
    };
    document.addEventListener("scroll", handelParallaxBackground);

    return () => {
      document.removeEventListener("scroll", handelParallaxBackground);
    };
  }, [checkDevice]);

  return (
    <Box position="relative">
      <Container
        as={Flex}
        size="md"
        mt="4rem"
        zIndex={2}
        position="relative"
        alignItems="flex-end"
        h={{ base: "200px", md: "400px" }}
      >
        <VStack
          align="start"
          // backdropFilter="auto"
          // backdropBlur="20px"
          // borderRadius="md"
          // overflow="hidden"
          color="var(--bg-navbar)"
          p="1rem"
        >
          <Heading
            as="h1"
            w={{ base: "100%", md: "700px" }}
            noOfLines={2}
            className="show-text"
            lineHeight="normal"
            textTransform="unset"
          >
            ANIMEFU.COM
          </Heading>
          <Text
            noOfLines={2}
            w={{ base: "100%", md: "450px" }}
            className="show-text"
            lineHeight="normal"
          >
            Asamura Yuuta, một học sinh cao trung bắt đầu sống cùng dưới một mái
            nhà với cô nữ sinh đẹp nhất khối- Ayase Saki dưới danh nghĩa anh em
            sau khi bố mẹ cả hai quyết định tái hôn. Chứng kiến cảnh bất hòa
            giữa hai vị phụ huynh trước kia của mình, cả hai người đều có những
            định kiến chẳng mấy tốt đẹp gì đối với mối quan hệ nam nữ. Sau đó,
            Yuuta và Saki đã thiết lập nên một lời hứa rằng không ai được phép
            quá xa, cũng không được phép bất hòa, chỉ giữ khoảng cách cần thiết
            trong mối quan hệ của cả hai.
          </Text>
        </VStack>
      </Container>
      <Box
        zIndex={-1}
        ref={bannerRef}
        position="absolute"
        backgroundImage="/images/1294117.png"
        backgroundSize="cover"
        backgroundPosition="center"
        // transform="scale(1.2)"
        h={{ base: "500px", md: "650px" }}
        inset={0}
      >
        {/* <Box
          inset={0}
          position="absolute"
          background="radial-gradient(circle, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 85%, var(--bg-main) 100%)"
        /> */}
        <Box
          inset={0}
          top="60%"
          position="absolute"
          background="linear-gradient(0deg, var(--bg-main) 0%, rgba(255,255,255,0) 100%)"
        />
      </Box>
    </Box>
  );
}

export default Banner;
