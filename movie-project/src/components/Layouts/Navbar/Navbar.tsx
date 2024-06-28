import categoryApi from "@/apis/category";
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  IconButton,
  Input,
  List,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import {
  FiBookmark,
  FiChevronDown,
  FiLogIn,
  FiRotateCw,
  FiSearch,
} from "react-icons/fi";
import NavbarCategory, { CategoryItem } from "./NavbarCategory";
import "./navbar.scss";
import NavbarLogout from "./NavbarLogout";
import { auth } from "@/auth";
import NotificationNav from "./NotificationNav";
import NavbarMobile from "./NavbarMobile";

export default async function Navbar() {
  const categories = await categoryApi.list();
  const session = await auth();

  return (
    <>
      <Box as="header" position="fixed" top={0} right={0} left={0} zIndex={5}>
        <input type="checkbox" id="dropbox" defaultChecked={false} hidden />
        <NavbarMobile />
        <Box
          display={{ base: "none", lg: "block" }}
          bg="var(--bg-navbar)"
          backdropFilter="saturate(180%) blur(5px)"
          boxShadow="base"
        >
          <Container size="md">
            <Flex as="nav" justifyContent="space-between" alignItems="center">
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  alt="logo website"
                  width={120}
                  height={100}
                />
              </Link>
              <Box position="relative" rounded="md" overflow="hidden">
                <form method="get" action="/movie-search">
                  <Input
                    py="10px"
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
                    <NavbarCategory />
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
              <HStack>
                <NotificationNav token={session?.user.token} />
                <Link href="/watch-history">
                  <IconButton
                    variant="transparentButton"
                    aria-label="history watch"
                    icon={<FiRotateCw />}
                  />
                </Link>
                <Link href="/bookmarks">
                  <IconButton
                    variant="transparentButton"
                    aria-label="bookmark movie"
                    icon={<FiBookmark />}
                  />
                </Link>
                {session ? (
                  <Menu>
                    <MenuButton
                      as={Button}
                      variant="transparentButton"
                      rightIcon={<FiChevronDown />}
                    >
                      {session.user.name} | Lv. {session.user.level}
                    </MenuButton>
                    <MenuList>
                      {session.user.role === "ADMIN" && (
                        <MenuItem as={Link} href="/admin">
                          Trang quản trị
                        </MenuItem>
                      )}
                      <MenuItem as={Link} href="/user">
                        Hồ sơ
                      </MenuItem>
                      <MenuItem as={Link} href="/user/change-password">
                        Đổi mật khẩu
                      </MenuItem>
                      <MenuItem as={Link} href="/bookmarks">
                        Phim của tôi
                      </MenuItem>
                      <NavbarLogout />
                    </MenuList>
                  </Menu>
                ) : (
                  <Link href="/user-register">
                    <IconButton
                      variant="transparentButton"
                      aria-label="login"
                      icon={<FiLogIn />}
                    />
                  </Link>
                )}
              </HStack>
            </Flex>
          </Container>
        </Box>
        <Container id="dropdown-menu" size="md" position="relative">
          <SimpleGrid
            as={List}
            boxShadow="0px 25px 80px 0px rgba(0,0,0,0.3)"
            borderTop="solid"
            borderColor="var(--bg-section)"
            borderTopWidth="2px"
            roundedBottom={5}
            position="absolute"
            textAlign="center"
            overflow="hidden"
            columns={{ base: 3, md: 5 }}
            zIndex={10}
            bg="white"
            left={4}
            right={4}
            gap="1px"
          >
            {categories.data.map((category) => (
              <CategoryItem
                key={category.id}
                text={category.name}
                href={"/category/" + category.slug}
              />
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
}
