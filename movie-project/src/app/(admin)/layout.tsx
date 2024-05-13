"use client";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  GridItem,
  IconButton,
  List,
  ListItem,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import {
  FiBook,
  FiFilm,
  FiHome,
  FiMenu,
  FiMessageSquare,
  FiStar,
  FiUsers,
  FiX,
} from "react-icons/fi";
import "@/app/globals.css";
import { navbarList } from "@/libs/const";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <Container maxW="container.2xl" height="100%" flex={1} p={0} zIndex={2}>
        <SimpleGrid columns={{ base: 1, lg: 11 }} spacing="1rem">
          <GridItem colSpan={2} display={{ base: "none", lg: "block" }}>
            <SildeBar />
          </GridItem>
          <GridItem colSpan={9}>{children}</GridItem>
        </SimpleGrid>
      </Container>
    </>
  );
}

function Navbar() {
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <>
      <Box as="nav" bg="var(--bg-navbar-admin)" py="0.5rem" mb="1rem">
        <Container
          as={Flex}
          maxW="container.2xl"
          height="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <Flex alignItems="center">
            <IconButton
              onClick={onToggle}
              display={{ base: "flex", lg: "none" }}
              icon={isOpen ? <FiX color="white" /> : <FiMenu color="white" />}
              variant="ghost"
              aria-label="Toggle Navigation"
            />
            <Box p="0.5rem">
              <Link href="/admin">
                <Image
                  width={100}
                  height={50}
                  src="/images/logo.png"
                  alt="logo"
                />
              </Link>
            </Box>

            {isOpen && <MobileNav isOpen={isOpen} onClose={onClose} />}
          </Flex>
          <DropdownNav />
        </Container>
      </Box>
    </>
  );
}

function DropdownNav() {
  return (
    <>
      <Flex alignItems="center" gap="1rem" position="relative">
        <Box rounded="50%" width="30px" height="30px" overflow="hidden">
          <Image
            width={100}
            height={50}
            src="https://i.imgur.com/Owoq65A.png"
            alt="avatar"
          />
        </Box>
        <Text cursor="pointer" color="var(--text-main)" fontWeight="500">
          Hi, Admin
        </Text>
      </Flex>
    </>
  );
}

function MobileNav({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg="var(--bg-main)">
          <DrawerBody>
            <SildeBar />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

const icons: { [key: string]: React.ReactElement } = {
  "Trang chủ": <FiHome />,
  "Người dùng": <FiUsers />,
  "Thể loại": <FiBook />,
  "Quản lý phim": <FiFilm />,
  "Bình luận": <FiMessageSquare />,
  "Đánh giá": <FiStar />,
};

export function SildeBar() {
  return (
    <>
      <Box bg="var(--bg-white)" overflow="hidden" rounded="md" p="1rem">
        <Accordion defaultIndex={[0, 2, 3, 4]} allowMultiple>
          {navbarList.map((sildeItem, index) => (
            <AccordionItem border="none" key={index}>
              <h2>
                {(sildeItem.children?.length ?? 0) > 0 ? (
                  <AccordionButton p="1rem">
                    {icons[sildeItem.name]}
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left"
                      pl="10px"
                      fontWeight="500"
                      fontSize="15px"
                    >
                      {sildeItem.name}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                ) : (
                  <Flex
                    p="1rem"
                    alignItems="center"
                    _hover={{ bg: "gray.100" }}
                  >
                    {icons[sildeItem.name]}
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left"
                      pl="10px"
                      fontWeight={"500"}
                      fontSize="15px"
                    >
                      {sildeItem.name}
                    </Box>
                  </Flex>
                )}
              </h2>
              <AccordionPanel p={0}>
                <List>
                  {sildeItem.children?.map((vl, index2) => (
                    <Link key={index2} href={vl.link}>
                      <ListItem
                        py="1rem"
                        px="2.5rem"
                        fontWeight={
                          location.pathname == vl.link ? "500" : "normal"
                        }
                        bg={location.pathname == vl.link ? "gray.100" : "none"}
                        _hover={{ bg: "gray.100" }}
                      >
                        {vl.name}
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    </>
  );
}
