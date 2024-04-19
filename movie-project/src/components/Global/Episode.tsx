import { Button } from "@chakra-ui/react";
import Link from "next/link";

export interface IEpisodeProps {
  text: string | number;
  href?: string;
}

export default function Episode(props: IEpisodeProps) {
  return (
    <Button as={Link} href={props?.href ?? "#"} variant="episode">
      {props.text}
    </Button>
  );
}
