"use client";

import adminCategoryApi from "@/apis/admin/adminCategory";
import ActionList from "@/components/Global/ActionList";
import CardCollection, {
  CardHeader,
} from "@/components/Global/Card/CardCollection";
import TableCustom from "@/components/Global/TableCustom";
import { Td, Text, Tr } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

export default function CategoryListPage() {
  const categoryListQuery = useQuery({
    queryKey: ["category-list-admin"],
    queryFn: () => adminCategoryApi.list(),
    retry: false,
  });
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
