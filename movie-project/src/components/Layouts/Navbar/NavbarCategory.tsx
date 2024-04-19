"use client";

import { useClickOutside } from "@/hooks/useClickOutside";
import { Button, Container, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import "./navbar.scss";

export default function NavbarCategory() {
  const [isOpenCategory, setIsOpenCategory] = useState(false);

  let handleCloseCategory = useClickOutside(() => {
    setIsOpenCategory(false);
    (document.querySelector("#dropbox") as HTMLInputElement).checked = false;
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
