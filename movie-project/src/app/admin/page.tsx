"use client";

import statisticalApi from "@/apis/admin/adminStatistical";
import CardCollection from "@/components/Global/Card/CardCollection";
import Chart from "@/components/Global/Chart";
import { StatsCard } from "@/components/Global/Statistical";
import { SimpleGrid, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { BsPerson } from "react-icons/bs";
import { FiFilm, FiMessageSquare, FiServer } from "react-icons/fi";

export default function AdminPage() {
  const session = useSession();

  const chartsQuery = useQuery({
    queryKey: ["chart"],
    queryFn: () =>
      statisticalApi.charts({ token: session.data?.user.token ?? "" }),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!session.data?.user.token,
  });

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing="3" mb={3}>
        <StatsCard
          title={"Người dùng"}
          stat={"5,000"}
          icon={<BsPerson size="2em" />}
        />
        <StatsCard
          title={"Bình luận hôm nay"}
          stat={"1,000"}
          icon={<FiMessageSquare size="2em" />}
        />
        <StatsCard
          title={"Tổng phim"}
          stat={"7"}
          icon={<FiFilm size="2em" />}
        />
        <StatsCard
          title={"Đang truy cập"}
          stat="..."
          icon={<FiServer size="2em" />}
        />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing="3" mb={3}>
        <CardCollection title="Biểu đồ người dùng mới" fontSize="0.8rem">
          <Chart
            name="Người"
            data={[5, 6, 7, 8, 9, 10, 11, 12]}
            labels={new Array(7)
              .fill(0)
              .map((_, index) => (index === 6 ? "CN" : `Thứ ${index + 2}`))}
          />
        </CardCollection>
        <CardCollection title="Biểu đồ lượt bình luận" fontSize="0.8rem">
          <Chart
            name="Bình luận"
            data={[5, 6, 7, 8, 9, 10, 11, 12]}
            labels={new Array(7)
              .fill(0)
              .map((_, index) => (index === 6 ? "CN" : `Thứ ${index + 2}`))}
          />
        </CardCollection>
        <CardCollection title="Biểu đồ lượt báo cáo" fontSize="0.8rem">
          <Chart
            name="Bình luận"
            data={[5, 6, 7, 8, 9, 10, 11, 12]}
            labels={new Array(7)
              .fill(0)
              .map((_, index) => (index === 6 ? "CN" : `Thứ ${index + 2}`))}
          />
        </CardCollection>
        <CardCollection
          title="Tỷ lệ người dùng quay lại sử dụng"
          fontSize="0.8rem"
        >
          <Chart
            name="Bình luận"
            data={[5, 6, 7, 8, 9, 10, 11, 12]}
            labels={new Array(7)
              .fill(0)
              .map((_, index) => (index === 6 ? "CN" : `Thứ ${index + 2}`))}
          />
        </CardCollection>
      </SimpleGrid>
    </>
  );
}
