import { Box, Tag, Text } from "@chakra-ui/react";

export interface ITagCustomProps {
  href?: string;
  text: string;
}

export default function TagCustom(props: ITagCustomProps) {
  return (
    <Box bg="var(--bg-navbar)" px={3} rounded="full">
      <Text color="var(--text-main)">{props.text}</Text>
    </Box>
  );
}
