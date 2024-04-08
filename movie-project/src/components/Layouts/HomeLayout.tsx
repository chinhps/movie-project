import { Container, SimpleGrid } from "@chakra-ui/react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container size="md">
      <SimpleGrid columns={5} maxW="1200px" mx="auto" spacing={3}>
        {children}
      </SimpleGrid>
    </Container>
  );
}
