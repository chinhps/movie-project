"use client";

import { useClickOutside } from "@/hooks/useClickOutside";
import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Input,
  List,
  ListItem,
  ListProps,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FiMenu } from "react-icons/fi";
import "./navbar.scss";
import { CategoryItem } from "./NavbarCategory";
import { useQuery } from "@tanstack/react-query";
import categoryApi from "@/apis/category";

interface INavbarV2Menu {
  logoURL: string;
}

function NavbarV2Menu({ logoURL }: INavbarV2Menu) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [isOpenCategory, setIsOpenCategory] = useState(false);

  let handleCloseMenu = useClickOutside(() => {
    setIsOpenMenu(false);
  }, isOpenMenu);

  let handleCloseSearch = useClickOutside(() => {
    setIsOpenSearch(false);
  }, isOpenSearch);

  let handleCloseCategory = useClickOutside(() => {
    setIsOpenCategory(false);
  }, isOpenCategory);

  const categories = useQuery({
    queryKey: ["categoris-list"],
    queryFn: () => categoryApi.list(),
    retry: false,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Flex gap={2}>
        <Box as={Link} href="/" zIndex={8} order={{ base: 2, md: 1 }}>
          <Image src={logoURL} alt="logo website" width={120} height={100} />
        </Box>
        <Center
          position={{ base: "relative", md: "absolute" }}
          order={{ base: 1, md: 2 }}
          inset={0}
          zIndex={1}
        >
          <IconButton
            variant="outline"
            aria-label="Menu"
            icon={<FiMenu />}
            ref={handleCloseMenu.domButtonNodeRef}
            onClick={() => setIsOpenMenu((prev) => !prev)}
            display={{ base: "flex", md: "none" }}
          />
        </Center>
      </Flex>
      <Box
        display="flex"
        position="absolute"
        top={{ base: "100%", md: "auto" }}
        right={0}
        left={0}
        zIndex={6}
      >
        <List
          display={{ base: isOpenMenu ? "flex" : "none", md: "flex" }}
          ref={handleCloseMenu.domNodeRef}
          className={isOpenMenu ? "navbar-menu" : ""}
          flexDirection={{ base: "column", md: "row" }}
          gap={10}
          w={{ base: "100%", md: "auto" }}
          mx="auto"
        >
          <ListItem
            cursor="pointer"
            ref={handleCloseSearch.domButtonNodeRef}
            onClick={() => {
              setIsOpenSearch((prev) => !prev);
              setIsOpenMenu(false);
            }}
          >
            Tìm kiếm
          </ListItem>
          <ListItem
            cursor="pointer"
            ref={handleCloseCategory.domButtonNodeRef}
            onClick={() => {
              setIsOpenSearch(false);
              setIsOpenMenu(false);
              setIsOpenCategory((prev) => !prev);
            }}
          >
            Thể loại
          </ListItem>
          <ListItem>Giới thiệu</ListItem>
          <ListItem>Từ vựng</ListItem>
        </List>
      </Box>

      {isOpenSearch && (
        <Center
          as="form"
          method="get"
          action="/movie-search"
          ref={handleCloseSearch.domNodeRef}
          className="base-popup"
          position={{ base: "absolute" }}
          top="100%"
          maxWidth="500px"
          mx="auto"
          left={0}
          right={0}
          zIndex={6}
        >
          <Input
            name="name"
            placeholder="Tìm kiếm theo tên phim, thông tin..."
          />
        </Center>
      )}
      {isOpenCategory && (
        <SimpleGrid
          as={List}
          ref={handleCloseCategory.domNodeRef}
          className="base-popup"
          position="absolute"
          textAlign="center"
          columns={{ base: 3, md: 5 }}
          zIndex={10}
          top="100%"
          bg="white"
          left={0}
          right={0}
          gap="1px"
        >
          {categories.data?.data.map((category) => (
            <CategoryItem
              key={category.id}
              text={category.name}
              href={"/category/" + category.slug}
            />
          ))}
        </SimpleGrid>
      )}
    </>
  );
}

export default React.memo(NavbarV2Menu);
