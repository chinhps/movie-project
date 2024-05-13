import { Box, Flex, Heading } from "@chakra-ui/react";

export default function CardCollection({
  children,
  title,
  fontSize,
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
      <Box bg="var(--bg-white)" rounded="md" p={padding} w="100%" height="100%">
        <Flex justifyContent="space-between">
          <Heading fontSize={fontSize ?? "18px"} textTransform="uppercase">
            {title}
          </Heading>
          {button}
        </Flex>
        <Box mt="0.5rem">{children}</Box>
      </Box>
    </>
  );
}
