import { Tag } from "@chakra-ui/react";

export interface ITagCustomProps {
  href?: string;
  text: string;
}

export default function TagCustom(props: ITagCustomProps) {
  return (
    <Tag borderRadius="full" variant="solid" colorScheme="blue" mx={1}>
      {props.text}
    </Tag>
  );
}
