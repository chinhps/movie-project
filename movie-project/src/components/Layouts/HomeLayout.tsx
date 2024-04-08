import { SimpleGrid } from "@chakra-ui/react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SimpleGrid columns={5} maxW="1200px" mx="auto" spacing={3}>{children}</SimpleGrid>;
}
