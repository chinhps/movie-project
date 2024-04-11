import { Button } from "@chakra-ui/react";

export interface IEpisodeProps {
  text: string | number;
  href?: string;
}

export default function Episode(props: IEpisodeProps) {
  return (
    <Button variant="episode">
      {props.text}
    </Button>
  );
}
