"use client";

import { ChakraProvider } from "@chakra-ui/react";
import themeChakra from "@/theme";

export function ChakraUIProviders({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={themeChakra}>{children}</ChakraProvider>;
}
