import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  ModalProps,
} from "@chakra-ui/react";

interface IModelBase extends ModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  handleConfirm: () => void;
  children: React.ReactNode;
}

export default function ModelConfirm({
  isOpen,
  onClose,
  isLoading,
  children,
  handleConfirm,
  ...props
}: IModelBase) {
  return (
    <>
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        {...props}
      >
        <ModalOverlay />
        <ModalContent bg="var(--bg-white)">
          <ModalHeader>Thông báo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>

          <ModalFooter gap={2}>
            <Button
              variant="auth"
              onClick={handleConfirm}
              isLoading={isLoading}
            >
              Chấp nhận
            </Button>
            <Button onClick={onClose}>Thoát</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
