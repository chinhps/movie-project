"use client";

import statisticalApi from "@/apis/admin/adminStatistical";
import CardCollection from "@/components/Global/Card/CardCollection";
import Chart from "@/components/Global/Chart";
import { StatsCard } from "@/components/Global/Statistical";
import { numberFormat } from "@/libs/function";
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
          stat={numberFormat(chartsQuery.data?.data.user_counts ?? 0, false)}
          icon={<BsPerson size="2em" />}
        />
        <StatsCard
          title={"Bình luận hôm nay"}
          stat={numberFormat(chartsQuery.data?.data.comment_in_day ?? 0, false)}
          icon={<FiMessageSquare size="2em" />}
        />
        <StatsCard
          title={"Tổng phim"}
          stat={numberFormat(chartsQuery.data?.data.movie_counts ?? 0, false)}
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
            data={chartsQuery.data?.data.user_in_week ?? []}
            labels={new Array(7)
              .fill(0)
              .map((_, index) => (index === 6 ? "CN" : `Thứ ${index + 2}`))}
          />
        </CardCollection>
        <CardCollection title="Biểu đồ lượt bình luận" fontSize="0.8rem">
          <Chart
            name="Bình luận"
            data={chartsQuery.data?.data.comment_in_week ?? []}
            labels={new Array(7)
              .fill(0)
              .map((_, index) => (index === 6 ? "CN" : `Thứ ${index + 2}`))}
          />
        </CardCollection>
        <CardCollection title="Biểu đồ lượt báo cáo" fontSize="0.8rem">
          <Chart
            name="Báo cáo"
            data={chartsQuery.data?.data.report_in_week ?? []}
            labels={new Array(7)
              .fill(0)
              .map((_, index) => (index === 6 ? "CN" : `Thứ ${index + 2}`))}
          />
        </CardCollection>
        <CardCollection
          title="Tỷ lệ người dùng quay lại sử dụng (Comming soon)"
          fontSize="0.8rem"
        >
          <Chart
            name="Người dùng"
            data={[0]}
            labels={new Array(7)
              .fill(0)
              .map((_, index) => (index === 6 ? "CN" : `Thứ ${index + 2}`))}
          />
        </CardCollection>
      </SimpleGrid>
    </>
  );
}
