import { HStack, IconButton, useDisclosure } from "@chakra-ui/react";
import { FiEdit, FiX } from "react-icons/fi";
import ModelConfirm from "./Model/ModelConfirm";

export default function ActionList({
  linkUpdate,
  onClickExits,
  actions,
  isLoading,
  icon,
}: {
  linkUpdate?: string;
  onClickExits?: () => void;
  actions?: Array<"EDIT" | "DELETE" | "CUSTOM">;
  isLoading?: boolean;
  icon?: React.ReactElement;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {onClickExits && (
        <ModelConfirm
          isOpen={isOpen}
          onClose={onClose}
          isLoading={isLoading ?? false}
          handleConfirm={() => {
            onClickExits();
            onClose();
          }}
        >
          Bạn có chắc muốn thực hiện không?
        </ModelConfirm>
      )}

      <HStack>
        {actions?.map((action) => {
          if (action === "EDIT") {
            return (
              <IconButton
                key={action}
                aria-label="Change"
                colorScheme="orange"
                variant="outline"
                icon={<FiEdit />}
              />
            );
          }
          if (action === "DELETE") {
            return (
              <IconButton
                key={action}
                aria-label="Delete"
                colorScheme="pink"
                variant="outline"
                onClick={onOpen}
                icon={<FiX />}
              />
            );
          }
          if (action === "CUSTOM") {
            return (
              <IconButton
                key={action}
                aria-label="refund"
                colorScheme="pink"
                variant="outline"
                onClick={onOpen}
                icon={icon}
              />
            );
          }
        })}
      </HStack>
    </>
  );
}
