import categoryApi from "@/apis/category";
import {
  Box,
  Container,
  Flex,
  HStack,
  IconButton,
  Input,
  List,
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
import {
  FiBell,
  FiBookmark,
  FiLogIn,
  FiRotateCw,
  FiSearch,
} from "react-icons/fi";
import NavbarCategory, { CategoryItem } from "./NavbarCategory";
import "./navbar.scss";
import NavbarUser from "./NavbarUser";
import { auth } from "@/auth";

export default async function Navbar() {
  const categories = await categoryApi.list();
  const session = await auth();

  return (
    <>
      <Box position="fixed" top={0} right={0} left={0} zIndex={5}>
        <input type="checkbox" id="dropbox" defaultChecked={false} hidden />

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
                  bg="white"
                  _placeholder={{ color: "var(--bg-gray)", fontWeight: "400" }}
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
                {session ? (
                  <NavbarUser
                    name={session?.user.name}
                    level={session?.user.level}
                  />
                ) : (
                  <Link href="/user-register">
                    <IconButton aria-label="login" icon={<FiLogIn />} />
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
            columns={5}
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
