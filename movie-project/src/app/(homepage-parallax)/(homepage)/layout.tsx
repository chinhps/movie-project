import { Container } from "@chakra-ui/react";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Container size="md" minH="90vh">
        {children}
      </Container>
    </>
  );
}
