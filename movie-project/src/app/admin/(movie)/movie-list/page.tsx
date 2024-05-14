"use client";

import ActionList from "@/components/Global/ActionList";
import CardCollection, {
  CardHeader,
} from "@/components/Global/Card/CardCollection";
import TableCustom from "@/components/Global/TableCustom";
import { Td, Text, Tr } from "@chakra-ui/react";

export default function MovieListPage() {
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
          <Tr>
            <Td>#1</Td>
            <Td>
              <Text>Chinh dep trai</Text>
              <Text>Phát hành: 2024 Q1</Text>
              <Text>Rate: 3.5</Text>
            </Td>
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
