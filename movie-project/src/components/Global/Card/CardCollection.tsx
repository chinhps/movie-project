import { Box, Flex, Heading, Stack } from "@chakra-ui/react";

export default function CardCollection({
  children,
  title,
  fontSize = "18px",
  button,
  padding = "1.5rem",
}: {
  children: React.ReactElement | React.ReactNode | string;
  title: string;
  fontSize?: string | undefined;
  button?: React.ReactElement;
  padding?: string;
}) {
  return (
    <>
      <Box bg="var(--bg-white)" rounded="md" p={padding} w="100%">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading fontSize={fontSize} textTransform="uppercase">
            {title}
          </Heading>
          {button}
        </Flex>
        <Box mt="0.5rem">{children}</Box>
      </Box>
    </>
  );
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Stack fontSize="14px" color="var(--bg-gray)">
        {children}
      </Stack>
    </>
  );
}
