"use client";

import adminEpisodeApi from "@/apis/admin/adminEpisode";
import CardCollection, {
  CardHeader,
} from "@/components/Global/Card/CardCollection";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FiEye, FiPlus } from "react-icons/fi";

interface IEpisodeState {
  id: number;
  episode_name: string;
  servers: Array<IServer>;
}

interface IServer {
  id: number;
  server_name: string;
  server_source: string;
}

function newEpisode(id: number): IEpisodeState {
  return {
    id: id,
    episode_name: "",
    servers: [newServer(0)],
  };
}

function newServer(id: number): IServer {
  return {
    id: id,
    server_name: "",
    server_source: "",
  };
}

export default function MovieEpisodePage({
  params,
}: {
  params: { id: string };
}) {
  const toast = useToast();
  const session = useSession();
  const [episodes, setEpisodes] = useState<Array<IEpisodeState>>([]);

  const upsertMutate = useMutation({
    mutationFn: (params: { token: string; params: object }) =>
      adminEpisodeApi.upsert(params),
    onSuccess: ({ data }) => {
      toast({
        status: "success",
        description: data.msg,
      });
    },
    onError: (data) => {
      toast({
        status: "error",
        description: data.message,
      });
    },
  });

  const handleSubmit = () => {
    if (session.data?.user.token) {
      upsertMutate.mutate({
        token: session.data?.user.token,
        params: {
          idMovie: params.id,
          data: episodes,
        },
      });
    }
  };

  const handleChangeEpisodes =
    (name: keyof IEpisodeState | keyof IServer) =>
    (idEpisode: number) =>
    (idServer: number) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const index = episodes.findIndex((episode) => episode.id === idEpisode);
      if (idServer === -1) {
        setEpisodes((prev) => {
          const newEpisodes = [...prev];
          newEpisodes[index] = {
            ...prev[index],
            [name]: event.target.value,
          };
          return newEpisodes;
        });
        return;
      }

      setEpisodes((prev) => {
        const newServers = [...prev];
        const indexServer = newServers[index].servers.findIndex(
          (server) => server.id === idServer
        );
        newServers[index].servers[indexServer] = {
          ...prev[index].servers[indexServer],
          [name]: event.target.value,
        };
        return newServers;
      });
    };

  useEffect(() => {
    setEpisodes((prev) => [...prev, newEpisode(0)]);
  }, []);

  return (
    <CardCollection title="Cập nhật tập phim">
      <CardHeader>
        <Text>Có thể thêm/cập nhật phim tại đây!</Text>
      </CardHeader>
      <Flex justify="space-between" my={3}>
        <Button
          colorScheme="red"
          variant="outline"
          rightIcon={<FiPlus />}
          onClick={() =>
            setEpisodes((prev) => [...prev, newEpisode(episodes.length)])
          }
        >
          Thêm tập mới khác
        </Button>
        <Button
          colorScheme="red"
          variant="outline"
          onClick={handleSubmit}
          isLoading={upsertMutate.isPending}
        >
          Hoàn thành
        </Button>
      </Flex>
      {episodes.map((episode, index) => (
        <Stack gap={3} key={index} mt={5}>
          <FormControl>
            <FormLabel>Tên tập phim</FormLabel>
            <HStack>
              <Input
                placeholder="Tên tập phim"
                onChange={handleChangeEpisodes("episode_name")(index)(-1)}
              />
              <IconButton
                aria-label="Status"
                icon={<FiEye />}
                colorScheme="red"
                variant="outline"
              />
              <IconButton
                aria-label="Add new episode"
                icon={<FiPlus />}
                colorScheme="red"
                variant="outline"
                onClick={() => {
                  setEpisodes((prev) => {
                    const newServerArray = [...prev];
                    newServerArray[index] = {
                      ...prev[index],
                      servers: [
                        ...newServerArray[index].servers,
                        newServer(newServerArray[index].servers.length),
                      ],
                    };
                    return newServerArray;
                  });
                }}
              />
            </HStack>
          </FormControl>
          <Flex>
            <Box px={5}>
              <Divider
                orientation="vertical"
                borderColor="var(--bg-navbar-admin)"
              />
            </Box>
            <Stack flex="1" gap={3}>
              {episode.servers.map((server, index2) => (
                <FormControl key={index2}>
                  <FormLabel>Tên server</FormLabel>
                  <HStack>
                    <Input
                      variant="formbase"
                      placeholder="Tên server"
                      onChange={handleChangeEpisodes("server_name")(index)(
                        index2
                      )}
                    />
                    <Input
                      variant="formbase"
                      placeholder="Source link"
                      onChange={handleChangeEpisodes("server_source")(index)(
                        index2
                      )}
                    />
                    <IconButton
                      aria-label="Status"
                      icon={<FiEye />}
                      colorScheme="red"
                      variant="outline"
                    />
                  </HStack>
                </FormControl>
              ))}
            </Stack>
          </Flex>
        </Stack>
      ))}
    </CardCollection>
  );
}
