import { HStack, Input, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
import { ChangeEvent, useCallback, useEffect, useState, FC } from "react";

interface InputTagProps {
  limit?: number;
  onChange?: (value: Array<string | number>) => void;
  isDisable?: boolean;
  values?: Array<string | number>;
  name?: string;
}

const InputTag: FC<InputTagProps> = ({
  limit,
  onChange,
  isDisable,
  values,
  name,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputValues, setInputValues] = useState<Array<string | number>>(values || []);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const handleInputBlur = useCallback(() => {
    if (inputValue) {
      setInputValues((prevValues) => [...prevValues, inputValue]);
      setInputValue("");
    }
  }, [inputValue]);

  const handleDeleteTag = useCallback((index: number) => {
    setInputValues((prevValues) => prevValues.filter((_, i) => i !== index));
  }, []);

  useEffect(() => {
    if (onChange) {
      onChange(inputValues);
    }
  }, [inputValues, onChange]);
  
  return (
    <>
      <HStack
        border="1px solid"
        borderColor="gray.300"
        p={3}
        borderRadius="5px"
        minH="48px"
        flexWrap="wrap"
      >
        {inputValues.map((tag, index) => (
          <Tag
            key={index}
            size="md"
            borderRadius="full"
            variant="solid"
            colorScheme="purple"
            color="white"
          >
            <TagLabel>{tag}</TagLabel>
            <TagCloseButton onClick={() => handleDeleteTag(index)} />
          </Tag>
        ))}
        {inputValues.length < (limit ?? 100) && (
          <Input
            value={inputValue}
            border="none"
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            disabled={isDisable}
            list={name}
            _focus={{ boxShadow: "none" }}
            minW="200px"
            h="auto"
            w={inputValue.length * 7 + "px"}
          />
        )}
      </HStack>
    </>
  );
};

export default InputTag;