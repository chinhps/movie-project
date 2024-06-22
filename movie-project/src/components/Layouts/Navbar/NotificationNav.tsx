"use client";

import notificationApi from "@/apis/notification";
import { INotification } from "@/types/response/notification.type";
import {
  Avatar,
  Box,
  GridItem,
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { FiBell } from "react-icons/fi";

export interface INotificationNavProps {
  token?: string;
}

export default function NotificationNav({ token }: INotificationNavProps) {
  const notificationQuery = useQuery({
    queryKey: ["notification-list"],
    queryFn: () => notificationApi.list(token ?? ""),
    enabled: !!token,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          variant="transparentButton"
          aria-label="Notification"
          icon={<FiBell />}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Thông báo!</PopoverHeader>
        <PopoverBody as={VStack} spacing={3} my={1}>
          {notificationQuery.isLoading && <Text>Đang tải...</Text>}
          {notificationQuery.data?.data.length === 0 && (
            <Text>Không có thông báo!</Text>
          )}
          {notificationQuery.data?.data.map((notifi) => (
            <NotifiItem key={notifi.id} {...notifi} />
          ))}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

function NotifiItem({ ...prop }: INotification) {
  return (
    <>
      <HStack w="100%" spacing={3}>
        <Box>
          <Avatar />
        </Box>
        <VStack align="right" spacing={0}>
          <Text>{prop.title}</Text>
          <Text>{prop.message}</Text>
        </VStack>
      </HStack>
    </>
  );
}
