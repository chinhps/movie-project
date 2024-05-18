"use client";

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Switch,
  Textarea,
} from "@chakra-ui/react";
import * as React from "react";
import { Controller, SubmitHandler, UseFormReturn } from "react-hook-form";
import { useEffect } from "react";
import FileCustomRHF from "./FileCustom";
import InputNumberCustom from "./InputNumberCustom";
import InputTag from "./InputTag";

export interface IFormBaseProps {
  structures: Array<IFormInput>;
  isLoading?: boolean;
  buttonText?: string;
  onSubmit: SubmitHandler<any>;
  hookForm: UseFormReturn<any>;
  dataDefault?: object;
  hiddenLabel?: boolean;
  customStyle?: React.CSSProperties;
}

export interface IFormInput {
  label: string;
  isRequired?: boolean;
  name: string;
  type: "SELECT" | "INPUT" | "TEXTAREA" | "NUMBER" | "FILE" | "SWITCH" | "TAGS";
  isPassword?: boolean;
  preview?: boolean;
  default?: string;
  defaults?: Array<string | number>;
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
  dataDefault,
  hiddenLabel,
  customStyle,
  ...props
}: IFormBaseProps) {
  useEffect(() => {
    dataDefault &&
      Object.entries(dataDefault).forEach(([key, value]) => {
        if (value) {
          setValue(key, value);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataDefault]);

  return (
    <form onSubmit={handleSubmit(props.onSubmit)} style={customStyle}>
      {props.structures.map((form, index) => (
        <FormControl
          key={index}
          gridArea={form.gridAreaName ?? form.name}
          isInvalid={!!errors[form.name]}
          my={2}
        >
          {!hiddenLabel && <FormLabel>{form.label}</FormLabel>}
          {form.type === "FILE" ? (
            <Controller
              render={({ field: { onChange, value } }) => (
                <FileCustomRHF
                  onChange={onChange}
                  value={value ?? (form.default ? [form.default] : null)}
                  multiple={form?.multiple}
                />
              )}
              control={control}
              name={form.name}
            />
          ) : form.type === "NUMBER" ? (
            <>
              <Controller
                render={({ field: { onChange, value } }) => (
                  <InputNumberCustom
                    handleChange={onChange}
                    value={value}
                    min={form.min}
                    max={form.max}
                  />
                )}
                defaultValue={form.default}
                control={control}
                name={form.name}
                // rules={form.validate ?? null}
              />
            </>
          ) : form.type === "TAGS" ? (
            <>
              <Controller
                render={({ field: { onChange, value, name } }) => (
                  <InputTag onChange={onChange} values={value} name={name} />
                )}
                defaultValue={form.defaults}
                control={control}
                name={form.name}
                // rules={form.validate ?? null}
              />
            </>
          ) : form.type === "SWITCH" ? (
            <Controller
              render={({ field: { onChange, value, name } }) => (
                <>
                  <Switch
                    fontSize="sm"
                    fontWeight="500"
                    size="lg"
                    onChange={onChange}
                    name={name}
                    isChecked={value}
                    value={value}
                  />
                </>
              )}
              defaultValue={form.default}
              control={control}
              name={form.name}
              // rules={form.validate ?? null}
            />
          ) : form.type === "INPUT" ? (
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
          ) : form.type === "TEXTAREA" ? (
            <Textarea
              variant="outline"
              fontSize="sm"
              fontWeight="500"
              // size="lg"
              {...register(form.name, {
                value: form.default ?? null,
                ...(form.validate ?? null),
              })}
              placeholder={form.placeholder ?? form.label}
            />
          ) : null}

          <FormErrorMessage>
            {errors[form.name] && (errors[form.name]?.message as string)}
          </FormErrorMessage>
        </FormControl>
      ))}
      <Button
        gridArea="button"
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
