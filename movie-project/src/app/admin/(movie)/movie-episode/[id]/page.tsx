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
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FiEye, FiEyeOff, FiPlus } from "react-icons/fi";

interface IEpisodeState {
  id: number;
  idEpisode: number | null;
  episode_name: string;
  status: boolean;
  servers: Array<IServer>;
}

interface IServer {
  id: number;
  idSource: number | null;
  status: boolean;
  server_name: string;
  server_source: string;
}

function newEpisode(id: number): IEpisodeState {
  return {
    id: id,
    idEpisode: null,
    episode_name: "",
    status: true,
    servers: [newServer(0)],
  };
}

function newServer(id: number): IServer {
  return {
    id: id,
    idSource: null,
    status: true,
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

  const detailQuery = useQuery({
    queryKey: ["episode-detail-admin", params.id],
    queryFn: () =>
      adminEpisodeApi.detail({
        token: session.data?.user.token ?? "",
        id: Number(params.id),
      }),
    enabled: !!params.id && !!session.data?.user.token,
    retry: false,
  });

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
    (
      event:
        | React.ChangeEvent<HTMLInputElement>
        | React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      const index = episodes.findIndex((episode) => episode.id === idEpisode);
      if (idServer === -1) {
        setEpisodes((prev) => {
          const newEpisodes = [...prev];
          newEpisodes[index] = {
            ...prev[index],
            [name]: (event as React.ChangeEvent<HTMLInputElement>).target.value
              ? (event as React.ChangeEvent<HTMLInputElement>).target.value
              : !prev[index].status,
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
          [name]: (event as React.ChangeEvent<HTMLInputElement>).target.value
            ? (event as React.ChangeEvent<HTMLInputElement>).target.value
            : !prev[index].servers[indexServer].status,
        };
        return newServers;
      });
    };

  useEffect(() => {
    if (detailQuery.data?.data) {
      setEpisodes(
        detailQuery.data.data.map((episode, index) => {
          return {
            id: index,
            idEpisode: episode.id,
            episode_name: episode.episode_name,
            status: episode.status === "on",
            servers: episode.movie_sources.map((source, index2) => {
              return {
                id: index2,
                idSource: source.id,
                status: source.status === "on",
                server_name: source.server_name,
                server_source: source.source_link,
              };
            }),
          };
        })
      );
    }
  }, [detailQuery.data?.data]);

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
                defaultValue={episode.episode_name}
                onChange={handleChangeEpisodes("episode_name")(index)(-1)}
              />
              <IconButton
                aria-label="Status"
                icon={episode.status ? <FiEye /> : <FiEyeOff />}
                colorScheme="red"
                variant="outline"
                onClick={handleChangeEpisodes("status")(index)(-1)}
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
                      defaultValue={server.server_name}
                      onChange={handleChangeEpisodes("server_name")(index)(
                        index2
                      )}
                    />
                    <Input
                      variant="formbase"
                      placeholder="Source link"
                      defaultValue={server.server_source}
                      onChange={handleChangeEpisodes("server_source")(index)(
                        index2
                      )}
                    />
                    <IconButton
                      aria-label="Status"
                      icon={server.status ? <FiEye /> : <FiEyeOff />}
                      colorScheme="red"
                      variant="outline"
                      onClick={handleChangeEpisodes("status")(index)(index2)}
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
