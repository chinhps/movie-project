"use client";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  List,
  ListItem,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  FiArrowLeft,
  FiBook,
  FiFilm,
  FiFlag,
  FiHome,
  FiUsers,
} from "react-icons/fi";
import { navbarList } from "@/libs/const";

const icons: { [key: string]: React.ReactElement } = {
  "Trang chủ": <FiHome />,
  "Người dùng": <FiUsers />,
  "Thể loại": <FiBook />,
  "Quản lý phim": <FiFilm />,
  "Báo cáo": <FiFlag />,
  "Trở về client": <FiArrowLeft />,
};

export default function SildeBarAdmin() {
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
                  <Link href={sildeItem.link ?? ""}>
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
                  </Link>
                )}
              </h2>
              <AccordionPanel p={0}>
                <List>
                  {sildeItem.children?.map((vl, index2) => (
                    <Link key={index2} href={vl.link}>
                      <ListItem
                        py="1rem"
                        px="2.5rem"
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
