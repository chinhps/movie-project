"use client";

import {
  Box,
  Container,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  GridItem,
  IconButton,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import "@/app/globals.css";
import SildeBarAdmin from "@/components/Layouts/SildeBarAdmin/SildeBarAdmin";

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
            <SildeBarAdmin />
          </GridItem>
          <GridItem colSpan={9}>{children}</GridItem>
        </SimpleGrid>
      </Container>
      <Box py={5} as="footer">
        <Flex justifyContent="center">
          <Text pt={6} fontSize="sm" textAlign="center" color="gray.500">
            © 2024 Admin Dashboard. All rights reserved
          </Text>
        </Flex>
      </Box>
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
            <SildeBarAdmin />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
