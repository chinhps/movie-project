import Footer from "@/components/Layouts/Footer";
import Navbar from "@/components/Layouts/Navbar/Navbar";
import { Container } from "@chakra-ui/react";
import "@/app/globals.css";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <Container size="md" mt="6rem">
        {children}
      </Container>
      <Footer />
    </>
  );
}
