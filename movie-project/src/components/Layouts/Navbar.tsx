"use client";

import { useClickOutside } from "@/hooks/useClickOutside";
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  IconButton,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  SimpleGrid,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FiBell,
  FiBookmark,
  FiChevronDown,
  FiChevronUp,
  FiLogIn,
  FiRotateCw,
  FiSearch,
} from "react-icons/fi";

export default function Navbar() {
  const [isOpenCategory, setIsOpenCategory] = useState(false);

  let handleCloseCategory = useClickOutside(() => {
    setIsOpenCategory(false);
  });

  return (
    <>
      <Box position="fixed" top={0} right={0} left={0} zIndex={5}>
        <Box bg="var(--bg-navbar)" py={3}>
          <Container size="md">
            <Flex justifyContent="space-between" alignItems="center">
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  alt="logo website"
                  width={120}
                  height={100}
                />
              </Link>
              <Box position="relative" rounded="md" overflow="hidden">
                <Input
                  py="10px"
                  px="20px"
                  type="text"
                  fontSize="14px"
                  placeholder="Nhập tên bộ phim..."
                  w="500px"
                />
                <HStack
                  right={0}
                  top={0}
                  bottom={0}
                  position="absolute"
                  height="auto"
                  spacing={0}
                >
                  <Button
                    variant="ghost"
                    fontSize="14px"
                    rightIcon={
                      isOpenCategory ? <FiChevronUp /> : <FiChevronDown />
                    }
                    color="var(--bg-gray)"
                    ref={handleCloseCategory.domButtonNodeRef}
                    onClick={() => setIsOpenCategory((prev) => !prev)}
                  >
                    Thể loại
                  </Button>
                  <IconButton
                    rounded={0}
                    height="100%"
                    width="50px"
                    aria-label="search"
                    icon={<FiSearch />}
                  />
                </HStack>
              </Box>
              <HStack>
                <Notification />
                <Link href="/watch-history">
                  <IconButton
                    aria-label="history watch"
                    icon={<FiRotateCw />}
                  />
                </Link>
                <Link href="/bookmarks">
                  <IconButton
                    aria-label="bookmark movie"
                    icon={<FiBookmark />}
                  />
                </Link>
                <Link href="/user-register">
                  <IconButton aria-label="login" icon={<FiLogIn />} />
                </Link>
              </HStack>
            </Flex>
          </Container>
        </Box>
        {isOpenCategory && (
          <Container
            size="md"
            position="relative"
            ref={handleCloseCategory.domNodeRef}
          >
            <SimpleGrid
              boxShadow="0px 25px 80px 0px rgba(0,0,0,0.3)"
              borderTop="solid"
              borderColor="var(--bg-section)"
              borderTopWidth="2px"
              roundedBottom={5}
              position="absolute"
              textAlign="center"
              overflow="hidden"
              columns={5}
              zIndex={10}
              bg="white"
              left={4}
              right={4}
              gap="1px"
            >
              <CategoryItem text="Anime" />
              <CategoryItem text="Hành động" />
              <CategoryItem text="Hài hước" />
              <CategoryItem text="Tình cảm" />
              <CategoryItem text="Harem" />
              <CategoryItem text="Bí ẩn" />
              <CategoryItem text="Bi kịch" />
            </SimpleGrid>
          </Container>
        )}
      </Box>
    </>
  );
}

function Notification() {
  return (
    <Popover>
      <PopoverTrigger>
        <IconButton aria-label="Notification" icon={<FiBell />} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Thông báo!</PopoverHeader>
        <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

function CategoryItem({ text }: { text: string }) {
  return (
    <Link href="/">
      <Box
        py={4}
        _hover={{
          backgroundColor: "var(--bg-navbar)",
          color: "var(--text-main)",
        }}
      >
        {text}
      </Box>
    </Link>
  );
}
