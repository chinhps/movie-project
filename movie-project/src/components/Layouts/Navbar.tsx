import {
  Box,
  Container,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import {
  FiBookmark,
  FiLogIn,
  FiMenu,
  FiRotateCw,
  FiSearch,
} from "react-icons/fi";

export default function Navbar() {
  return (
    <Box bg="var(--bg-navbar)" py={3} mb={5}>
      <Container size="md">
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="logo website"
                width={120}
                height={100}
              />
            </Link>
          </Box>
          <Box>
            <Search />
          </Box>
          <HStack>
            <IconButton aria-label="menu" icon={<FiMenu />} />
            <IconButton aria-label="history watch" icon={<FiRotateCw />} />
            <IconButton aria-label="bookmark movie" icon={<FiBookmark />} />
            <IconButton aria-label="login" icon={<FiLogIn />} />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}

function Search() {
  return (
    <Box position="relative" rounded="md" overflow="hidden">
      <Input
        py="10px"
        px="20px"
        type="text"
        fontSize="14px"
        placeholder="Nhập tên bộ phim..."
        w="500px"
      />
      <IconButton
        right={0}
        top={0}
        bottom={0}
        rounded={0}
        position="absolute"
        height="auto"
        width="45px"
        aria-label="search"
        icon={<FiSearch />}
      />
    </Box>
  );
}
