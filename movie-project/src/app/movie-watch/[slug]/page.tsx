import Comment from "@/components/Global/Comments/Comment";
import Episode from "@/components/Global/Episode";
import {
  AspectRatio,
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  IconButton,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  FiChevronsRight,
  FiCornerDownRight,
  FiEyeOff,
  FiMeh,
  FiStar,
} from "react-icons/fi";

export default function MovieWatchPage() {
  return (
    <>
      <Stack spacing={2}>
        <HStack
          justifyContent="space-between"
          rounded={10}
          bg="var(--bg-navbar)"
          p={5}
          color="var(--text-main)"
        >
          <Stack>
            <Heading as="h1" fontSize="20px">
              <Link href="/movie-detail/wefew">
                Tsuki ga Michibiku Isekai Douchuu 2nd Season
              </Link>
            </Heading>
            <Text>Đang xem tập 1</Text>
          </Stack>
          <Stack align="end" fontSize="15px">
            <Text>Đăng 2 ngày trước</Text>
            <Text>Báo cáo</Text>
          </Stack>
        </HStack>
        <AspectRatio rounded={10} overflow="hidden" ratio={16 / 9} bg="black">
          <iframe
            src="https://animehay.blog/pow.php?id=61989"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen={true}
          ></iframe>
        </AspectRatio>

        <HStack justifyContent="space-between" mt={1}>
          <HStack>
            <Button variant="secondButton">HY</Button>
            <Button>POW</Button>
            <Button variant="secondButton">TOK</Button>
          </HStack>
          <Text fontSize="13px">
            Lưu lại hoặc nhớ link thông báo: BRANDNAME.com để có thể truy cập
            web khi nhà mạng chặn!
          </Text>
          <HStack>
            <Button variant="secondButton" rightIcon={<FiEyeOff />}>
              Remove Ads
            </Button>
            <Button rightIcon={<FiChevronsRight />}>Tiếp theo</Button>
          </HStack>
        </HStack>

        <VStack align="start" mt={2} bg="white" rounded={5} p={5}>
          <Text as="b">Danh sách tập</Text>
          <HStack wrap="wrap" maxH="240px" overflowY="auto">
            {new Array(99).fill(0).map((_, index) => (
              <Episode text={index + 1} key={index} />
            ))}
          </HStack>
        </VStack>
        <CommentWatch />
      </Stack>
    </>
  );
}

function CommentWatch() {
  return (
    <>
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
    </>
  );
}
