import { auth } from "@/auth";
import { StatsCard } from "@/components/Global/Statistical";
import { SimpleGrid } from "@chakra-ui/react";
import { BsPerson } from "react-icons/bs";
import { FiServer } from "react-icons/fi";

export default async function AdminPage() {
  const session = await auth();
  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing="3">
        <StatsCard
          title={"Người dùng"}
          stat={"5,000"}
          icon={<BsPerson size={"3em"} />}
        />
        <StatsCard
          title={"Bình luận hôm nay"}
          stat={"1,000"}
          icon={<FiServer size={"3em"} />}
        />
        <StatsCard
          title={"Lượt xem hôm nay"}
          stat={"7"}
          icon={<FiServer size={"3em"} />}
        />
        <StatsCard
          title={"Tổng phim"}
          stat={"7"}
          icon={<FiServer size={"3em"} />}
        />
      </SimpleGrid>
    </>
  );
}
