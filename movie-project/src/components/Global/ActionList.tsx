import { HStack, IconButton, useDisclosure } from "@chakra-ui/react";
import { FiEdit, FiX } from "react-icons/fi";
import ModelConfirm from "./Model/ModelConfirm";
import Link from "next/link";

export default function ActionList({
  linkUpdate,
  onClickExits,
  actions,
  isLoading,
  handleCustom,
  icon,
}: {
  linkUpdate?: string;
  onClickExits?: () => void;
  actions?: Array<"EDIT" | "DELETE" | "CUSTOM">;
  isLoading?: boolean;
  icon?: React.ReactElement;
  handleCustom?: () => void;
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
              <Link key={action} href={linkUpdate ?? "#"}>
                <IconButton
                  aria-label="Change"
                  colorScheme="orange"
                  variant="outline"
                  icon={<FiEdit />}
                />
              </Link>
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
                aria-label="custom"
                colorScheme="pink"
                variant="outline"
                onClick={handleCustom}
                icon={icon}
              />
            );
          }
        })}
      </HStack>
    </>
  );
}
