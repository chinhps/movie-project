"use client";

import {
  Box,
  Container,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Input,
  List,
  ListItem,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import NavbarCategory from "./NavbarCategory";
import { FiMenu, FiSearch, FiX } from "react-icons/fi";
import { useState } from "react";
import { useSession } from "next-auth/react";
import NavbarLogout from "./NavbarLogout";

export default function NavbarMobile() {
  const [isShowSearch, setIsShowSearch] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const session = useSession();

  return (
    <>
      <Box
        py={3}
        display={{ base: "block", lg: "none" }}
        bg="var(--bg-navbar)"
        backdropFilter="saturate(180%) blur(5px)"
        boxShadow="base"
      >
        <Container size="md">
          <Flex
            as="nav"
            justifyContent="space-between"
            alignItems="center"
            gap={2}
          >
            {isShowSearch ? (
              <>
                <Box position="relative" rounded="md" overflow="hidden">
                  <form method="get" action="/movie-search">
                    <Input
                      py="5px"
                      px="20px"
                      type="text"
                      fontSize="14px"
                      placeholder="Nhập tên bộ phim..."
                      w="500px"
                      bg="white"
                      name="name"
                      _placeholder={{
                        color: "var(--bg-gray)",
                        fontWeight: "400",
                      }}
                    />
                    <HStack
                      right={0}
                      top={0}
                      bottom={0}
                      position="absolute"
                      height="auto"
                      spacing={0}
                    >
                      <IconButton
                        type="submit"
                        rounded={0}
                        height="100%"
                        width="50px"
                        aria-label="search"
                        icon={<FiSearch />}
                      />
                    </HStack>
                  </form>
                </Box>
                <IconButton
                  aria-label="search button"
                  icon={<FiX />}
                  onClick={() => setIsShowSearch((prev) => !prev)}
                />
              </>
            ) : (
              <>
                <Link href="/">
                  <Image
                    src="/images/logo.png"
                    alt="logo website"
                    width={120}
                    height={100}
                  />
                </Link>
                <HStack>
                  <NavbarCategory />
                  <IconButton
                    aria-label="search button"
                    icon={<FiSearch />}
                    onClick={() => setIsShowSearch((prev) => !prev)}
                  />
                  <IconButton
                    aria-label="menu"
                    icon={<FiMenu />}
                    onClick={onOpen}
                  />
                </HStack>
              </>
            )}
          </Flex>
        </Container>
      </Box>
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>
            <List>
              <ListItem p={2}>
                <Box as={Link} href="/watch-history">
                  Lịch sử xem
                </Box>
              </ListItem>
              <ListItem p={2}>
                <Box as={Link} href="/bookmarks">
                  Bookmark của tôi
                </Box>
              </ListItem>
              {session.data?.user ? (
                <>
                  <ListItem p={2}>
                    <Box as={Link} href="/user">
                      Tài khoản của tôi
                    </Box>
                  </ListItem>
                  <ListItem p={2}>
                    <NavbarLogout />
                  </ListItem>
                </>
              ) : (
                <>
                  <ListItem p={2}>
                    <Box as={Link} href="/user-register">
                      Đăng ký
                    </Box>
                  </ListItem>
                  <ListItem p={2}>
                    <Box as={Link} href="/user-login">
                      Đăng nhập
                    </Box>
                  </ListItem>
                </>
              )}
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
