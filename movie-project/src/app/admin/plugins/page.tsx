"use client";

import adminPluginApi from "@/apis/admin/adminPlugin";
import ActionList from "@/components/Global/ActionList";
import CardCollection, {
  CardHeader,
} from "@/components/Global/Card/CardCollection";
import TableCustom from "@/components/Global/TableCustom";
import { Td, Text, Tr } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function PluginListPage() {
  /****----------------
   *      HOOK
  ----------------****/
  const session = useSession();
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState({});
  const pluginListQuery = useQuery({
    queryKey: ["plugin-list", filter, page],
    queryFn: () =>
      adminPluginApi.list({ page, token: session.data?.user.token ?? "" }),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!session.data?.user.token,
  });
  /****----------------
   *      END-HOOK
  ----------------****/
  console.log(session.data);

  return (
    <CardCollection title="Danh sách Plugin">
      <CardHeader>
        <Text>Danh sách Plugin!</Text>
      </CardHeader>
      <TableCustom thead={["ID", "Tên", "Trạng thái", "Thông tin", "Thao tác"]}>
        {pluginListQuery.data?.data.map((vl) => (
          <Tr key={vl.id}>
            <Td>#{vl.id}</Td>
            <Td>{vl.name}</Td>
            <Td>{vl.status}</Td>
            <Td>
              {vl.data_public?.map((detail, index) => (
                <Text key={index} w="300px" overflow="hidden">
                  {detail.name}: {detail.value.toString()}
                </Text>
              ))}
            </Td>
            <Td>
              <ActionList
                actions={["EDIT"]}
                linkUpdate={"/admin/plugins/" + vl.id}
              />
            </Td>
          </Tr>
        ))}
      </TableCustom>
    </CardCollection>
  );
}
