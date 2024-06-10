import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

export default function useDisclosureData<T>() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState<T | null>();

  const onOpenData = (newData: T) => {
    onOpen();
    setData(newData);
  };

  const onCloseData = () => {
    setData(undefined);
    onClose();
  };

  return { isOpen, onOpenData, onCloseData, data };
}
