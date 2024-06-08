import { SimpleGrid, SimpleGridProps } from "@chakra-ui/react";

interface IHomeLayout extends SimpleGridProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children, ...props }: IHomeLayout) {
  return (
    <SimpleGrid
      columns={{ base: 2, md: 3, lg: 4, xl: 5 }}
      gap={{ base: 3, lg: 4 }}
      px={{ base: 2, lg: 0 }}
      mx="auto"
      {...props}
    >
      {children}
    </SimpleGrid>
  );
}
