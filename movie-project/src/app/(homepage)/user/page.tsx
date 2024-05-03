import CardCollection from "@/components/Global/Card/CardCollection";
import { numberFormat } from "@/libs/function";
import {
  Avatar,
  Center,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

export default function UserPage() {
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
                <Td color="ocean.200">chinh dep trai</Td>
              </Tr>
              <Tr>
                <Td>Số dư</Td>
                <Td color="ocean.200">{numberFormat(500000)}</Td>
              </Tr>
              <Tr>
                <Td>Ngày Tham Gia</Td>
                <Td>fgdfbd</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </CardCollection>
    </>
  );
}
