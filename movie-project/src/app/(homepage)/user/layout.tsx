import SideBar from "@/components/Layouts/SideBar";
import { GridItem, SimpleGrid } from "@chakra-ui/react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SimpleGrid columns={12} spacing="1rem">
        <GridItem
          colSpan={{ base: 12, md: 3 }}
          bg="var(--bg-auth-from)"
          overflow="hidden"
          rounded="md"
          p="1rem"
        >
          <SideBar />
        </GridItem>
        <GridItem
          colSpan={{ base: 12, md: 9 }}
          bg="var(--bg-auth-from)"
          rounded="md"
          p={{ base: "0.5rem", md: "1rem" }}
        >
          {children}
        </GridItem>
      </SimpleGrid>
    </>
  );
}
