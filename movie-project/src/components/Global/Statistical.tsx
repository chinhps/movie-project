import { Box, Flex, Stat, StatLabel, StatNumber } from "@chakra-ui/react";

interface StatsCardProps {
  title: string;
  stat: string;
  icon: React.ReactNode;
}
export function StatsCard(props: StatsCardProps) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      border={"1px solid"}
      bg="var(--bg-white)"
      borderColor="gray.200"
      rounded={"lg"}
    >
      <Flex justifyContent={"space-between"} px={{ base: 2, md: 4 }}>
        <Box>
          <StatLabel fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {stat}
          </StatNumber>
        </Box>
        <Box my={"auto"} color={"gray.800"} alignContent={"center"}>
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}
