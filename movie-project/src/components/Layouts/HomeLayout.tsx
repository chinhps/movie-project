import { SimpleGrid, SimpleGridProps } from "@chakra-ui/react";

interface IHomeLayout extends SimpleGridProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children, ...props }: IHomeLayout) {
  return (
    <SimpleGrid columns={5} maxW="1200px" mx="auto" spacing={3} {...props}>
      {children}
    </SimpleGrid>
  );
}
