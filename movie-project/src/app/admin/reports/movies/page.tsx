import CardCollection, {
  CardHeader,
} from "@/components/Global/Card/CardCollection";
import TableCustom from "@/components/Global/TableCustom";
import { Td, Text, Tr } from "@chakra-ui/react";

export default function ReportMoviePage() {
  return (
    <CardCollection title="Báo cáo lỗi phim">
      <CardHeader>
        <Text>Nơi chứa các phim bị báo cáo!</Text>
      </CardHeader>
      <TableCustom
        thead={[
          "id",
          "Thông tin người dùng",
          "Nội dung báo cáo",
          "Trạng thái",
          "Thao tác",
        ]}
      >
        <Tr>
          <Td>123</Td>
          <Td>123</Td>
          <Td>123</Td>
          <Td>123</Td>
        </Tr>
      </TableCustom>
    </CardCollection>
  );
}
