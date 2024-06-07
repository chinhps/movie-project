import { Box, HStack, Heading, StackProps } from "@chakra-ui/react";

export interface IHeaderProps extends StackProps {
  children: React.ReactNode;
  rightLink?: React.ReactNode | null;
}

export default function Header({ rightLink, ...props }: IHeaderProps) {
  return (
    <HStack {...props} justifyContent="space-between">
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
          fontSize="15px"
          w="fit-content"
          color="var(--text-main)"
          textTransform="uppercase"
        >
          {props.children}
        </Heading>
      </Box>
      {rightLink}
    </HStack>
  );
}
