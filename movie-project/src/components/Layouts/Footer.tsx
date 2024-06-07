import {
  Box,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";

export default function Footer() {
  return (
    <>
      <Box
        as="footer"
        bg="var(--bg-main-second)"
        color="var(--text-main)"
        mt={10}
        py={8}
      >
        <Container size="md">
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(5, 1fr)" }}
            gap={10}
            fontSize="14px"
          >
            <GridItem as={Flex} flexDirection="column" colSpan={3} gap={3}>
              <Heading as="h2" fontSize="23px">
                BRAND NAME
              </Heading>
              <Text fontWeight="normal">
                BRANDNAME.Com - Trang web xem Anime HD trực tuyến. Kho Anime
                phong phú nhiều thể loại, cập nhật mới liên tục mỗi ngày.
              </Text>
              <Text fontWeight="normal">
                Mọi dữ liệu trên BRANDNAME.Com đều được tổng hợp và re-upload từ
                internet.
              </Text>
            </GridItem>
            <GridItem as={Flex} flexDirection="column" colSpan={2} gap={3}>
              <Heading as="h2" fontSize="23px">
                Liên hệ
              </Heading>
              <Text fontWeight="normal">
                Liên hệ quảng cáo: <Text as="b">abc@gmail.com</Text>
              </Text>
              <Text fontWeight="normal">
                The advertisements on the page are powered by another platform,
                so be careful with the ad content. BRANDNAME will not assume any
                responsibility for advertisements.
              </Text>
            </GridItem>
          </Grid>
        </Container>
      </Box>
      <Center as="footer" py={2} bg="var(--bg-footer)">
        <Text fontSize="13px" color="var(--text-main)">
          Copyright © 2024. BRANDNAME.Com. All Rights Reserved.
        </Text>
      </Center>
    </>
  );
}
