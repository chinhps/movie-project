"use client";

import { useClickOutside } from "@/hooks/useClickOutside";
import {
  Box,
  Button,
  Container,
  IconButton,
  ListItem,
  SimpleGrid,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp, FiGrid, FiMenu, FiX } from "react-icons/fi";
import "./navbar.scss";
import Link from "next/link";

// const handleClose = () => {
//   (document.querySelector("#dropbox") as HTMLInputElement).checked = false;
// };

export default function NavbarCategory() {
  const [isOpenCategory, setIsOpenCategory] = useState(false);

  // let handleCloseCategory = useClickOutside(() => {
  //   setIsOpenCategory(false);
  //   handleClose();
  // }, isOpenCategory);

  // useEffect(() => {
  //   handleCloseCategory.domNodeRef.current =
  //     document.querySelector("#dropdown-menu");
  // }, [handleCloseCategory.domNodeRef]);

  return (
    <>
      {/* <IconButton
        as="label"
        htmlFor="dropbox"
        icon={!isOpenCategory ? <FiGrid /> : <FiX />}
        aria-label="category list"
        display={{ base: "flex", lg: "none" }}
        ref={handleCloseCategory.domButtonNodeRef}
        onClick={() => setIsOpenCategory((prev) => !prev)}
      />
      <Button
        display={{ base: "none", lg: "flex" }}
        as="label"
        htmlFor="dropbox"
        variant="ghost"
        fontSize="14px"
        rightIcon={isOpenCategory ? <FiChevronUp /> : <FiChevronDown />}
        color="var(--bg-gray)"
        ref={handleCloseCategory.domButtonNodeRef}
        onClick={() => setIsOpenCategory((prev) => !prev)}
      >
        Thể loại
      </Button> */}
    </>
  );
}

export function CategoryItem({ text, href }: { text: string; href: string }) {
  return (
    <ListItem
      as="li"
      color="var(--text-main)"
      my="auto"
      _hover={{
        backgroundColor: "var(--bg-main-second)",
        color: "var(--anti-text-main)",
      }}
    >
      <Box
        as={Link}
        href={href}
        display="block"
        py={4}
        scroll={true}
        // onClick={handleClose}
      >
        {text}
      </Box>
    </ListItem>
  );
}
