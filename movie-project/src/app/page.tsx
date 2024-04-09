import Banner from "@/components/Global/Banner";
import MovieItem from "@/components/Global/MovieItem";
import Footer from "@/components/Layouts/Footer";
import HomeLayout from "@/components/Layouts/HomeLayout";
import Navbar from "@/components/Layouts/Navbar";
import { Box, Container, Heading } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Navbar />
      <Container size="md">
        <Banner />
        <Box
          clipPath="polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%)"
          bg="var(--bg-section)"
          w="fit-content"
          py={3}
          pl={5}
          pr={10}
          my={3}
        >
          <Heading
            as="h1"
            fontSize="18px"
            w="fit-content"
            color="var(--text-main)"
          >
            ANIME MỚI CẬP NHẬT
          </Heading>
        </Box>
      </Container>
      <HomeLayout>
        {new Array(10).fill(0).map((_, index) => (
          <MovieItem key={index} />
        ))}
      </HomeLayout>
      <Footer />
    </>
  );
}
