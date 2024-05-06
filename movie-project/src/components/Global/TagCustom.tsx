import { Tag } from "@chakra-ui/react";

export interface ITagCustomProps {
  href?: string;
  text: string;
}

export default function TagCustom(props: ITagCustomProps) {
  return (
    <Tag borderRadius="full" fontSize="13px" variant="solid" colorScheme="blue">
      {props.text}
    </Tag>
  );
}
