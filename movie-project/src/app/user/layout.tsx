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
          colSpan={3}
          bg="var(--bg-auth-from)"
          overflow="hidden"
          rounded="md"
          p="1rem"
        >
          <SideBar />
        </GridItem>
        <GridItem colSpan={9} bg="var(--bg-auth-from)" rounded="md" p="2rem">
          {children}
        </GridItem>
      </SimpleGrid>
    </>
  );
}
