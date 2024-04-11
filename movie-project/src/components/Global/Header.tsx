import { Box, HStack, Heading } from "@chakra-ui/react";

export interface IHeaderProps {
  children: React.ReactNode;
  rightLink?: React.ReactElement;
}

export default function Header(props: IHeaderProps) {
  return (
    <HStack mt={6} mb={3} justifyContent="space-between">
      <Box
        clipPath="polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%)"
        bg="var(--bg-section)"
        w="fit-content"
        py={3}
        pl={5}
        pr={10}
      >
        <Heading
          as="h1"
          fontSize="18px"
          w="fit-content"
          color="var(--text-main)"
        >
          {props.children}
        </Heading>
      </Box>
      {props?.rightLink}
    </HStack>
  );
}
