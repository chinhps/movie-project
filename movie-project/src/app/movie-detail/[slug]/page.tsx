import Comment from "@/components/Global/Comments/Comment";
import Episode from "@/components/Global/Episode";
import TagCustom from "@/components/Global/TagCustom";
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  IconButton,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import {
  FiCornerDownRight,
  FiFilm,
  FiHeart,
  FiMeh,
  FiStar,
} from "react-icons/fi";

export default function MovieDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <Stack gap={3}>
      <Grid templateColumns="repeat(4,1fr)" gap={5} bg="white" rounded={5} p={5}>
        <GridItem colSpan={1}>
          <Box rounded="md" overflow="hidden">
            <Image
              src="/images/movie.jpg"
              alt="movie avatar"
              width={400}
              height={700}
            />
          </Box>
          <VStack spacing={2} mt={2}>
            <Button
              as={Link}
              href="/movie-watch/svsvwdvds"
              variant="mainButton"
              w="100%"
              padding="23px 0"
              leftIcon={<FiFilm />}
            >
              XEM NGAY
            </Button>
            <Button
              variant="secondButton"
              w="100%"
              padding="23px 0"
              leftIcon={<FiHeart />}
            >
              YÊU THÍCH
            </Button>
          </VStack>
        </GridItem>
        <GridItem as={Flex} flexDirection="column" gap={3} colSpan={3}>
          <Heading as="h1" fontSize="30px">
            Thần Ấn Vương Tọa
          </Heading>
          <VStack spacing={4} align="start">
            <Flex gap={4}>
              <Text as="b">Tên khác</Text> Throne Of Seal (2022)
            </Flex>
            <Flex gap={4}>
              <Text as="b">Thể loại</Text>{" "}
              <Flex flexWrap="wrap">
                {new Array(10).fill(0).map((vl, index) => (
                  <TagCustom key={index} text="Fantasy" />
                ))}
              </Flex>
            </Flex>
            <Flex gap={4}>
              <Text as="b">Trạng thái</Text> Đã hoàn thành
            </Flex>
            <Flex gap={4}>
              <Text as="b">Điểm</Text> 9.5 || 12.000 Đánh giá
            </Flex>
            <Flex gap={4}>
              <Text as="b">Phát hành</Text> Q1 2020
            </Flex>
            <Flex gap={4}>
              <Text as="b">Thời lượng</Text> 150 Tập
            </Flex>
          </VStack>

          <VStack align="start" mt={2}>
            <Text as="b">Phim liên kết</Text>
            <HStack>
              <Episode text="Huhu haha meem" />
              <Episode text="123" />
              <Episode text="123" />
            </HStack>
          </VStack>
          <VStack align="start" mt={2}>
            <Text as="b">Danh sách tập (100 tập)</Text>
            <HStack wrap="wrap" maxH="150px" overflowY="auto">
              {new Array(99).fill(0).map((_, index) => (
                <Episode text={index + 1} key={index} />
              ))}
            </HStack>
          </VStack>
        </GridItem>
      </Grid>
      <VStack spacing={3} align="start" bg="white" rounded={5} p={5}>
        <Heading as="h2" fontSize="23px">
          Nội dung phim
        </Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat
          eius aperiam voluptates quaerat autem tempora exercitationem possimus
          consequuntur aliquid vero quae ea, nihil, sit repellendus facilis
          nostrum reiciendis? Quis, aliquid. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Omnis odio, aperiam, quae nulla natus
          totam porro quis expedita a ut doloremque harum voluptatibus
          architecto non consequuntur, qui consequatur necessitatibus quas.
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi
          vero, tempora veritatis repellat facere cupiditate qui vitae minus
          corrupti optio ea accusamus consectetur voluptas! Ipsa aliquid quos
          vero natus doloremque!z
        </Text>
      </VStack>
      <Divider my={2} />
      <VStack spacing={3} align="start">
        <Text as="b">Bình luận (1000)</Text>
        <Flex
          w="100%"
          rounded="xl"
          overflow="hidden"
          height="130px"
          position="relative"
          bg="var(--bg-white)"
        >
          <Input
            py={5}
            px={5}
            height="55%"
            placeholder="Viết gì đó tại đây..."
            bg="var(--bg-white)"
          />
          <HStack
            justifyContent="space-between"
            position="absolute"
            bottom={3}
            left={3}
            right={3}
          >
            <HStack>
              <IconButton aria-label="send star" icon={<FiStar />} />
              <IconButton aria-label="sticker" icon={<FiMeh />} />
            </HStack>
            <IconButton
              aria-label="send comment"
              icon={<FiCornerDownRight />}
            />
          </HStack>
        </Flex>
      </VStack>
      <VStack bg="white" rounded={5} p={5}>
        <Comment />
        <Comment />
        <Comment />

        <Text mx="auto" fontSize="14px" mt={5} color="var(--bg-section)">
          Xem thêm bình luận...
        </Text>
      </VStack>
    </Stack>
  );
}
