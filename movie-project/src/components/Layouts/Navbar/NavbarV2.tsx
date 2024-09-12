import { auth } from "@/auth";
import StarBorder from "@/components/Global/StarBorder/StarBorder";
import {
  Box,
  Button,
  Container,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import NavbarLogout from "./NavbarLogout";
import { FiChevronDown } from "react-icons/fi";
import NavbarV2Menu from "./NavbarV2Menu";
import Link from "next/link";

export default async function NavberV2({ logoURL }: { logoURL: string }) {
  const session = await auth();

  return (
    <>
      <Box w="100%" py={{ base: 2, md: 5 }} px={{ base: 2, md: 0 }}>
        <Container size="md">
          <HStack position="relative" justify="space-between">
            <NavbarV2Menu logoURL={logoURL} />
            <HStack position="relative" gap={{ base: 2, md: 5 }} zIndex={6}>
              {session ? (
                <Menu isLazy={true} lazyBehavior="keepMounted">
                  <MenuButton
                    as={Button}
                    variant="transparentButton"
                    rightIcon={<FiChevronDown />}
                    noOfLines={1}
                    display="flex"
                  >
                    {session.user.name}
                  </MenuButton>
                  <MenuList w="fit-content" minW="auto">
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
                <>
                  <Box display={{ base: "none", md: "block" }}>
                    <Link href="/user-login">Đăng nhập</Link>
                  </Box>
                  <Link href="/user-register">
                    <StarBorder
                      as="button"
                      p="0.5rem 1rem"
                      color="red"
                      speed="5s"
                    >
                      Đăng ký
                    </StarBorder>
                  </Link>
                </>
              )}
            </HStack>
          </HStack>
        </Container>
      </Box>
    </>
  );
}
