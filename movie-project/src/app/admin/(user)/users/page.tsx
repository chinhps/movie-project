"use client";

import adminUserApi from "@/apis/admin/adminUser";
import ActionList from "@/components/Global/ActionList";
import CardCollection, {
  CardHeader,
} from "@/components/Global/Card/CardCollection";
import Paginate from "@/components/Global/Paginate";
import TableCustom from "@/components/Global/TableCustom";
import { Td, Text, Tr } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function UserListPage({
  searchParams: { page },
}: {
  searchParams: { page: number | undefined };
}) {
  const session = useSession();
  const userListQuery = useQuery({
    queryKey: ["user-list-admin", page],
    queryFn: () =>
      adminUserApi.list({
        token: session.data?.user.token ?? "",
        page: page,
      }),
    retry: false,
    enabled: !!session.data?.user.token,
  });
  return (
    <>
      <CardCollection title="Danh sách người dùng">
        <CardHeader>
          <Text>Danh sách người dùng!</Text>
        </CardHeader>
        <TableCustom
          thead={[
            "id",
            "Provider ID",
            "Thông tin người dùng",
            "Level",
            "Lượt bình luận",
            "Trạng thái",
            "Thao tác",
          ]}
        >
          {userListQuery.data?.data.map((user) => (
            <Tr key={user.id}>
              <Td>#{user.id}</Td>
              <Td>{user.provider_id}</Td>
              <Td>
                <Text>Tài khoản: {user.username}</Text>
                <Text>Tên: {user.name}</Text>
              </Td>
              <Td>{user.level}</Td>
              <Td>{user.comments_count}</Td>
              <Td>{user.status}</Td>
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
        {userListQuery.data?.paginate && (
          <Paginate
            pageLink="/admin/users"
            currentPage={userListQuery.data?.paginate.current_page}
            totalPage={userListQuery.data?.paginate.last_page}
          />
        )}
      </CardCollection>
    </>
  );
}
