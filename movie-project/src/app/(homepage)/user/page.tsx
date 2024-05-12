import { auth } from "@/auth";
import CardCollection from "@/components/Global/Card/CardCollection";
import { numberFormat } from "@/libs/function";
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import moment from "moment/moment";

export default async function UserPage() {
  const session = await auth();

  return (
    <>
      <CardCollection title="Thông tin người dùng">
        {/* <Center my="1rem">
          <Avatar size="xl" />
        </Center> */}
        <TableContainer mt={5}>
          <Table>
            <TableCaption>Thông tin cơ bản về tài khoản</TableCaption>
            <Thead>
              <Tr>
                <Th>Thông tin</Th>
                <Th>Hiện tại</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Tên Hiển Thị</Td>
                <Td color="ocean.200">{session?.user.name}</Td>
              </Tr>
              <Tr>
                <Td>Tên tài khoản</Td>
                <Td color="ocean.200">{session?.user.username}</Td>
              </Tr>
              <Tr>
                <Td>Level</Td>
                <Td color="ocean.200">{session?.user.level}</Td>
              </Tr>
              <Tr>
                <Td>Ngày Tham Gia</Td>
                <Td>{moment(session?.user.created_at).format("MM/DD/YYYY")}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </CardCollection>
    </>
  );
}
