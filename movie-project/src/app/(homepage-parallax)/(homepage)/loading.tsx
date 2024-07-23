import { Center, Spinner } from "@chakra-ui/react";

export default function Loading() {
  return (
    <>
      <Center
        position="fixed"
        inset={0}
        bg="var(--banner-description)"
        blur="md"
        zIndex={100}
      >
        <Spinner />
      </Center>
    </>
  );
}
