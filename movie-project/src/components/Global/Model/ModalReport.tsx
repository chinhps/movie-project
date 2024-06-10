import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";

export interface IModalReportProps {
  isOpen: boolean;
  onCloseData: () => void;
  handleSubmit: () => void;
  children: React.ReactNode;
}

export default function ModalReport({
  isOpen,
  onCloseData,
  children,
  handleSubmit,
}: IModalReportProps) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onCloseData}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tại sao bạn muốn báo cáo?</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>{children}</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Báo cáo
            </Button>
            <Button variant="ghost" onClick={onCloseData}>
              Huỷ
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
