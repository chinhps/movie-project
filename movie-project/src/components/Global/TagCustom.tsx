import { Box, Tag, Text } from "@chakra-ui/react";

export interface ITagCustomProps {
  href?: string;
  text: string;
}

export default function TagCustom(props: ITagCustomProps) {
  return (
    <Box bg="var(--bg-navbar)" px={2} rounded="full">
      <Text color="var(--text-main)" fontSize="0.8rem">{props.text}</Text>
    </Box>
  );
}
