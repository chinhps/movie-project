import { Container } from "@chakra-ui/react";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Container size="md" mt="5rem" minH="90vh">
        {children}
      </Container>
    </>
  );
}
