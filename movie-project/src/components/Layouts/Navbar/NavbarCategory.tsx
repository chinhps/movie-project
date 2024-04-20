"use client";

import { useClickOutside } from "@/hooks/useClickOutside";
import { Box, Button, Container, ListItem, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import "./navbar.scss";
import Link from "next/link";

const handleClose = () => {
  (document.querySelector("#dropbox") as HTMLInputElement).checked = false;
};

export default function NavbarCategory() {
  const [isOpenCategory, setIsOpenCategory] = useState(false);

  let handleCloseCategory = useClickOutside(() => {
    setIsOpenCategory(false);
    handleClose();
  }, isOpenCategory);

  useEffect(() => {
    handleCloseCategory.domNodeRef.current =
      document.querySelector("#dropdown-menu");
  }, [handleCloseCategory.domNodeRef]);

  return (
    <>
      <Button
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
      </Button>
    </>
  );
}

export function CategoryItem({ text, href }: { text: string; href: string }) {
  return (
    <ListItem
      as="li"
      _hover={{
        backgroundColor: "var(--bg-navbar)",
        color: "var(--text-main)",
      }}
    >
      <Box
        as={Link}
        href={href}
        display="block"
        py={4}
        scroll={true}
        onClick={handleClose}
      >
        {text}
      </Box>
    </ListItem>
  );
}
