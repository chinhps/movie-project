"use client";

import ActionList from "@/components/Global/ActionList";
import CardCollection, {
  CardHeader,
} from "@/components/Global/Card/CardCollection";
import TableCustom from "@/components/Global/TableCustom";
import { Td, Text, Tr } from "@chakra-ui/react";

export default function CategoryListPage() {
  return (
    <>
      <CardCollection title="Danh sách thể loại">
        <CardHeader>
          <Text>Danh sách thể loại!</Text>
        </CardHeader>
        <TableCustom
          thead={["id", "Tên thể loại", "Nội dung", "Slug", "Thao tác"]}
        >
          <Tr>
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
