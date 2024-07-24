import { Box, Tag, Text } from "@chakra-ui/react";

export interface ITagCustomProps {
  href?: string;
  text: string;
}

export default function TagCustom(props: ITagCustomProps) {
  return (
    <Tag bg="var(--bg-navbar)" rounded="full" color="var(--text-main)">
      {props.text}
    </Tag>
  );
}
