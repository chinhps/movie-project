"use client";

import adminReportApi from "@/apis/admin/adminReport";
import ActionList from "@/components/Global/ActionList";
import CardCollection, {
  CardHeader,
} from "@/components/Global/Card/CardCollection";
import ModalReport from "@/components/Global/Model/ModalReport";
import Paginate from "@/components/Global/Paginate";
import TableCustom from "@/components/Global/TableCustom";
import UserDetail from "@/components/Global/Tables/UserDetail";
import useDisclosureData from "@/hooks/useDisclosureData";
import {
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Stack,
  Td,
  Text,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FiCoffee } from "react-icons/fi";

export default function ReportCommentPage({
  searchParams: { page },
}: {
  searchParams: { page: number | undefined };
}) {
  const toast = useToast();
  const session = useSession();
  const [status, setStatus] = useState<string>();
  const [report, setReport] = useState<(string | number)[]>();
  const { isOpen, onOpenData, onCloseData, data } = useDisclosureData();

  const dataQuery = useQuery({
    queryKey: ["report-comment-list-admin", page],
    queryFn: () =>
      adminReportApi.comment({
        token: session.data?.user.token ?? "",
        page: page,
      }),
    retry: false,
    enabled: !!session.data?.user.token,
  });

  const changeStatusMutate = useMutation({
    mutationFn: () =>
      adminReportApi.reportAction({
        token: session.data?.user.token ?? "",
        params: {
          id: data,
          status,
          report,
        },
      }),
    onSuccess: ({ data }) => {
      toast({
        status: "success",
        description: data.msg,
      });
      onCloseData();
      dataQuery.refetch();
    },
    onError: (data) => {
      toast({
        status: "error",
        description: data.message,
      });
    },
  });

  return (
    <>
      <ModalReport
        isOpen={isOpen}
        onCloseData={onCloseData}
        handleSubmit={() => changeStatusMutate.mutate()}
      >
        <RadioGroup onChange={setStatus} mb={5}>
          <Stack direction="column">
            <Radio value="success">Hoàn thành</Radio>
            <Radio value="spam">Spam báo cáo</Radio>
          </Stack>
        </RadioGroup>
        <CheckboxGroup onChange={setReport}>
          <Stack spacing={2} direction="column">
            <Checkbox value="hidden">Ẩn bình luận</Checkbox>
            <Checkbox value="block">Khoá tài khoản</Checkbox>
          </Stack>
        </CheckboxGroup>
      </ModalReport>

      <CardCollection title="Báo cáo bình luận">
        <CardHeader>
          <Text>Nơi chứa các bình luận bị báo cáo!</Text>
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
          {dataQuery.data?.data.map((vl) => (
            <Tr key={vl.id}>
              <Td>{vl.id}</Td>
              <Td>
                <UserDetail user={vl.user} />
              </Td>
              <Td>
                <Text>{vl.description.join(", ")}</Text>
                <Text>Trạng thái: {vl.comment.status}</Text>
                <Text>Nội dung: {vl.comment.message}</Text>
              </Td>
              <Td>{vl.status}</Td>
              <Td>
                <ActionList
                  actions={["CUSTOM"]}
                  icon={<FiCoffee />}
                  handleCustom={() => onOpenData(vl.id)}
                />
              </Td>
            </Tr>
          ))}
        </TableCustom>
        {dataQuery.data?.paginate && (
          <Paginate
            pageLink="/admin/reports/comments"
            currentPage={dataQuery.data?.paginate.current_page}
            totalPage={dataQuery.data?.paginate.last_page}
          />
        )}
      </CardCollection>
    </>
  );
}
