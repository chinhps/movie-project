"use client";

import ActionList from "@/components/Global/ActionList";
import CardCollection, {
  CardHeader,
} from "@/components/Global/Card/CardCollection";
import TableCustom from "@/components/Global/TableCustom";
import { Td, Text, Tr } from "@chakra-ui/react";

export default function UserListPage() {
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
            "Tên người dùng",
            "Họ và tên",
            "Level",
            "Trạng thái",
            "Thao tác",
          ]}
        >
          <Tr>
            <Td>#1</Td>
            <Td>asdfada</Td>
            <Td>asdfada</Td>
            <Td>asdfada</Td>
            <Td>asdfada</Td>
            <Td>asdfada</Td>
            <Td>
              <ActionList
                actions={["EDIT", "DELETE"]}
                linkUpdate={"./update/service/"}
                onClickExits={() => alert(1)}
              />
            </Td>
          </Tr>
        </TableCustom>
      </CardCollection>
    </>
  );
}
