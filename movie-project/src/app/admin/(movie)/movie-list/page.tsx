"use client";

import adminMovieApi from "@/apis/admin/adminMovie";
import ActionList from "@/components/Global/ActionList";
import CardCollection, {
  CardHeader,
} from "@/components/Global/Card/CardCollection";
import Paginate from "@/components/Global/Paginate";
import TableCustom from "@/components/Global/TableCustom";
import { Td, Text, Tr } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function MovieListPage({
  searchParams: { page },
}: {
  searchParams: { page: number | undefined };
}) {
  const session = useSession();
  const movieListQuery = useQuery({
    queryKey: ["movie-list-admin", page],
    queryFn: () =>
      adminMovieApi.list({
        token: session.data?.user.token ?? "",
        page: page,
      }),
    retry: false,
    enabled: !!session.data?.user.token,
  });
  return (
    <>
      <CardCollection title="Danh sách phim">
        <CardHeader>
          <Text>Danh phim!</Text>
        </CardHeader>
        <TableCustom
          thead={[
            "id",
            "Thông tin",
            "Số tập",
            "Bình luận",
            "Báo cáo",
            "Trạng thái",
            "Thao tác",
          ]}
        >
          {movieListQuery.data?.data.map((movie) => (
            <Tr key={movie.id}>
              <Td>#{movie.id}</Td>
              <Td>
                <Text>{movie.movie_name}</Text>
                <Text>Phát hành: {movie.release}</Text>
                <Text>Rate: {movie.movie_rate_avg_rate}</Text>
              </Td>
              <Td>
                {movie.episoded_counter}/{movie.episodes_counter}
              </Td>
              <Td>{movie.comments_counter}</Td>
              <Td>{movie.report_counter}</Td>
              <Td>{movie.status}</Td>
              <Td>
                <ActionList
                  actions={["EDIT", "DELETE"]}
                  linkUpdate={"./update/service/"}
                  onClickExits={() => alert(1)}
                />
              </Td>
            </Tr>
          ))}
        </TableCustom>
        {movieListQuery.data?.paginate && (
          <Paginate
            pageLink="/admin/movie-list"
            currentPage={movieListQuery.data?.paginate.current_page}
            totalPage={movieListQuery.data?.paginate.last_page}
          />
        )}
      </CardCollection>
    </>
  );
}
