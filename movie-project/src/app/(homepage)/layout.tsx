import Footer from "@/components/Layouts/Footer";
import Navbar from "@/components/Layouts/Navbar/Navbar";
import { Container } from "@chakra-ui/react";
import "@/app/globals.css";
import Blur from "@/components/Global/Blur";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <Container size="md" mt="5rem" minH="90vh">
        {children}
      </Container>
      <Footer />
      <Blur
          position={"fixed"}
          top={-10}
          left={-10}
          style={{ filter: "blur(70px)" }}
        />
    </>
  );
}
