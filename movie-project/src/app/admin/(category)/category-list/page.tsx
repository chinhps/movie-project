"use client";

import adminCategoryApi from "@/apis/admin/adminCategory";
import ActionList from "@/components/Global/ActionList";
import CardCollection, {
  CardHeader,
} from "@/components/Global/Card/CardCollection";
import Paginate from "@/components/Global/Paginate";
import TableCustom from "@/components/Global/TableCustom";
import { Button, Td, Text, Tr } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function CategoryListPage({
  searchParams: { page },
}: {
  searchParams: { page: number | undefined };
}) {
  const session = useSession();
  const categoryListQuery = useQuery({
    queryKey: ["category-list-admin", page],
    queryFn: () =>
      adminCategoryApi.list({
        token: session.data?.user.token ?? "",
        page: page,
      }),
    retry: false,
    enabled: !!session.data?.user.token,
  });
  return (
    <>
      <CardCollection
        title="Danh sách thể loại"
        button={
          <Button as={Link} href="./category-upsert" colorScheme="red" variant="outline">
            THÊM MỚI
          </Button>
        }
      >
        <CardHeader>
          <Text>Danh sách thể loại!</Text>
        </CardHeader>
        <TableCustom
          thead={["id", "Tên thể loại", "Nội dung", "Slug", "Thao tác"]}
        >
          {categoryListQuery.data?.data.map((category) => (
            <Tr key={category.id}>
              <Td>#{category.id}</Td>
              <Td>{category.name}</Td>
              <Td>
                <Text w="200px" overflow="hidden">
                  {category.description}
                </Text>
              </Td>
              <Td>
                <Text w="200px" overflow="hidden">
                  {category.slug}
                </Text>
              </Td>
              <Td>
                <ActionList
                  actions={["EDIT", "DELETE"]}
                  linkUpdate={"/admin/category-upsert?id=" + category.id}
                  onClickExits={() => alert(1)}
                />
              </Td>
            </Tr>
          ))}
        </TableCustom>
        {categoryListQuery.data?.paginate && (
          <Paginate
            pageLink="/admin/category-list"
            currentPage={categoryListQuery.data?.paginate.current_page}
            totalPage={categoryListQuery.data?.paginate.last_page}
          />
        )}
      </CardCollection>
    </>
  );
}
