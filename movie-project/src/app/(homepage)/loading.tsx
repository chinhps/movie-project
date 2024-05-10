import { Spinner, Box, Text } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Box
      w="full"
      m="auto"
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap="2"
    >
      <Spinner color="red.500" />
      <Text color="gray.700">Đang tải...</Text>
    </Box>
  );
}
