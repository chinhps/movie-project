import { AspectRatio, HStack, Heading, Stack, Text } from "@chakra-ui/react";

export default function MovieWatchPage() {
  return (
    <>
      <Stack spacing={3}>
        <HStack
          justifyContent="space-between"
          rounded={10}
          bg="var(--bg-navbar)"
          p={5}
          color="var(--text-main)"
        >
          <Stack>
            <Heading as="h1" fontSize="20px">
              Tsuki ga Michibiku Isekai Douchuu 2nd Season
            </Heading>
            <Text>Đang xem tập 1</Text>
          </Stack>
          <Stack align="end">
            <Text>Đăng 2 ngày trước</Text>
            <Text>Báo cáo</Text>
          </Stack>
        </HStack>
        <AspectRatio rounded={20} overflow="hidden" ratio={16 / 9}>
          <iframe
            src="https://animehay.us/pow.php?id=61989"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen={true}
          ></iframe>
        </AspectRatio>
      </Stack>
    </>
  );
}
