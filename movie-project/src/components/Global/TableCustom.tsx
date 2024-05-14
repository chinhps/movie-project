import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react";

export default function TableCustom({
  children,
  thead,
}: {
  children: React.ReactNode;
  thead: Array<string>;
}) {
  return (
    <>
      <TableContainer mt="0.5rem">
        <Table variant="unstyled">
          <Thead bg="var(--bg-navbar-admin)" color="var(--text-main)">
            <Tr>
              {thead.map((vl, index) => (
                <Th key={index}>{vl}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody fontWeight="500">{children}</Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
