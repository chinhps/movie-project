import { navbarListUser } from "@/libs/const";
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
import { FiLock, FiStopCircle, FiUsers } from "react-icons/fi";

const icons: { [key: string]: React.ReactElement } = {
  "Hồ sơ": <FiUsers />,
  "Mật khẩu": <FiLock />,
  "Nạp xu": <FiStopCircle />,
};

export default function SideBar() {
  return (
    <Accordion defaultIndex={[0, 1, 2]} allowMultiple>
      {navbarListUser.map((sildeItem, index) => (
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
              <Flex p="1rem" alignItems="center" _hover={{ bg: "gray.100" }}>
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
                  <ListItem py="1rem" px="2.5rem" _hover={{ bg: "gray.100" }}>
                    {vl.name}
                  </ListItem>
                </Link>
              ))}
            </List>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
