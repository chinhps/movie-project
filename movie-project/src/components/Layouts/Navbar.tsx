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
            <Image
              src="/images/logo.png"
              alt="logo website"
              width={120}
              height={100}
            />
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
    <InputGroup size="md" overflow="hidden" rounded="md">
      <Input type="text" rounded={0} fontSize="14px" placeholder="Nhập tên bộ phim..." w="500px" />
      <InputRightElement>
        <IconButton rounded={0} aria-label="search" icon={<FiSearch />} />
      </InputRightElement>
    </InputGroup>
  );
}
