import { Button } from "@chakra-ui/react";
import Link from "next/link";

export interface IEpisodeProps {
  text: string | number;
  href?: string;
}

export default function Episode(props: IEpisodeProps) {
  return (
    <Link href={props?.href ?? "#"}>
      <Button variant="episode">{props.text}</Button>
    </Link>
  );
}
