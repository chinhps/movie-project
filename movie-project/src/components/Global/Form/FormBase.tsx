"use client";

import { Button, FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import * as React from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";

export interface IFormBaseProps {
  structures: Array<IFormInput>;
  isLoading?: boolean;
  buttonText?: string;
  onSubmit: SubmitHandler<any>;
  hookForm: UseFormReturn<any>;
}

export interface IFormInput {
  label: string;
  isRequired?: boolean;
  name: string;
  type: "SELECT" | "INPUT" | "TEXTAREA" | "NUMBER" | "FILE" | "SWITCH";
  isPassword?: boolean;
  preview?: boolean;
  default?: string;
  placeholder?: string;
  disable?: boolean;
  max?: number;
  min?: number;
  multiple?: boolean;
  gridAreaName?: string;
  validate?: { required: string };
  selects?: Array<{
    label: string;
    value: string;
  }>;
}

export default function FormBase({
  hookForm: {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  },
  ...props
}: IFormBaseProps) {
  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      {props.structures.map((form, index) => (
        <FormControl key={index} isInvalid={!!errors[form.name]} my={2}>
          <Input
            type={form.isPassword ? "password" : "text"}
            variant="formbase"
            disabled={form.disable}
            {...register(form.name, {
              value: form.default ?? null,
              ...(form.validate ?? null),
            })}
            placeholder={form.placeholder ?? form.label}
          />
          <FormErrorMessage>
            {errors[form.name] && (errors[form.name]?.message as string)}
          </FormErrorMessage>
        </FormControl>
      ))}
      <Button
        type="submit"
        variant="mainButton"
        w="100%"
        py="1.5rem"
        isLoading={props?.isLoading ?? isSubmitting}
      >
        {props?.buttonText ?? "Xác nhận"}
      </Button>
    </form>
  );
}
