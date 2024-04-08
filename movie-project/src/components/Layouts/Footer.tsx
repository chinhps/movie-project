import { Box, Container, Heading, SimpleGrid, VStack } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box as="footer" bg="var(--bg-navbar)" color="var(--text-main)" mt={5}>
      <Container size="md">
        <SimpleGrid columns={2}>
          <VStack align="start">
            <Heading as="h2">BRAND NAME</Heading>
          </VStack>
          <VStack align="start">
            <Heading as="h2">Lien he</Heading>
          </VStack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
