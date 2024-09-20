import { BlurText } from "@/components/Global/BlurText/BlurText";
import GradientText from "@/components/Global/GradientText/GradientText";
import Magnet from "@/components/Global/Magnet/Magnet";
import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import DotPattern from "../DotPattern/DotPattern";
import StarBorder from "@/components/Global/StarBorder/StarBorder";
import React from "react";
import Link from "next/link";

function HeaderV2() {
  return (
    <Box
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack
        w="100%"
        h={{ base: "500px", md: "650px" }}
        justifyContent="center"
        textAlign="center"
        zIndex={5}
        backgroundImage="radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%)"
      >
        <Heading as="h1" fontSize={{ base: "1.5rem", md: "2rem" }}>
          <BlurText text={"ANIMEFU NƠI VỪA ĐỂ GIẢI TRÍ"} delay={20} />
          <BlurText text={"VÀ LÀ NỀN TẢNG HỌC TẬP TIẾNG ANH"} delay={40} />
        </Heading>
        <GradientText
          colors={["#111111", "#2C8CC2"]} // Custom gradient colors
          animationSpeed={3} // Custom animation speed in seconds
          showBorder={false} // Show or hide border
          padding={{ base: "0rem 1.5rem", md: "" }}
          maxWidth="550px"
          w="100%"
        >
          Không chỉ là một nền tảng học tập mà còn là nơi mang lại niềm vui và
          động lực cho người dùng thông qua các bộ anime hấp dẫn.
        </GradientText>
        <Magnet padding={50} disabled={false}>
          <Link href="/user-register">
            <StarBorder p="0.5rem 1rem" color="red" speed="5s">
              Bắt đầu ngay
            </StarBorder>
          </Link>
        </Magnet>
      </VStack>
      <DotPattern width={20} height={20} cx={1} cy={1} cr={1} />
    </Box>
  );
}

export default React.memo(HeaderV2);
