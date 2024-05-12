import { Box, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { FiChevronRight, FiFilm, FiStar } from "react-icons/fi";

export default function Banner() {
  return (
    <Box
      position="relative"
      maxH="310px"
      roundedTopStart={20}
      roundedBottomEnd={20}
      overflow="hidden"
      boxShadow="lg"
    >
      <Image
        src="/images/banner.png"
        width={1200}
        height={100}
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
        <Heading as="h1" fontSize="18px">
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
