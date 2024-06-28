"use client";
import commentApi from "@/apis/comment";
import { CommentSchema } from "@/schemas";
import {
  FormControl,
  FormErrorMessage,
  HStack,
  IconButton,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { FiCornerDownRight } from "react-icons/fi";
import * as z from "zod";

export interface IInputCommentProps {
  slugMovie: string;
  handleSuccess: () => void;
  value?: string;
  parentId?: number;
}

export default function InputComment({
  slugMovie,
  handleSuccess,
  value,
  parentId,
}: IInputCommentProps) {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema),
  });
  const toast = useToast();
  const { data: session } = useSession();

  const commentAddMutation = useMutation({
    mutationFn: (message: string) =>
      commentApi.createComment({
        params: {
          slug: slugMovie,
          message: message,
          parentId,
        },
        token: session?.user.token ?? "",
      }),
    onSuccess: ({ data }) => {
      toast({
        description: data.msg,
        status: "success",
      });
      handleSuccess();
      setValue("message", "");
    },
    onError: (data) => {
      toast({
        status: "error",
        description: data.message,
      });
    },
  });

  const onSubmit = (values: z.infer<typeof CommentSchema>) => {
    commentAddMutation.mutate(values.message);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <HStack
          rounded="xl"
          position="relative"
          bg="var(--bg-white)"
          height="100%"
          p={5}
        >
          <FormControl isInvalid={!!errors.message}>
            <FormErrorMessage>
              <Text ml={3}>{errors.message?.message}</Text>
            </FormErrorMessage>
            <Textarea
              p={0}
              rows={3}
              resize="none"
              placeholder="Viết gì đó tại đây..."
              bg="var(--bg-white)"
              variant="pill"
              defaultValue={value}
              {...register("message")}
            />
          </FormControl>
          <IconButton
            type="submit"
            isLoading={commentAddMutation.isPending}
            aria-label="send comment"
            icon={<FiCornerDownRight />}
          />
        </HStack>
      </form>
    </>
  );
}
