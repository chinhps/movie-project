"use client";

import { numberFormat, saveEpisode } from "@/libs/function";
import { IEpisode, IEpisodeSource } from "@/types/response/movies.type";
import {
  AspectRatio,
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  HStack,
  Heading,
  IconButton,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiChevronsRight, FiEyeOff, FiFlag } from "react-icons/fi";
import useDisclosureData from "@/hooks/useDisclosureData";
import ModalReport from "@/components/Global/Model/ModalReport";
import { useMutation } from "@tanstack/react-query";
import reportApi from "@/apis/report";
import { useSession } from "next-auth/react";
import BookmarkButton from "../../(homepage)/movie-detail/[slug]/BookmarkButton";
import PlyrDualCaption from "@/components/Global/VideoPlayer/PlyrDualCaption";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.locale("vi");
dayjs.extend(relativeTime);

const Cinema = ({
  movieSource,
  episodes,
  currentEpisodeSlug,
  movieName,
  episodeName,
  movieSlug,
  vtts,
  createdAt,
  views
}: {
  movieSource: Array<IEpisodeSource>;
  episodes?: Array<IEpisode>;
  currentEpisodeSlug: string;
  movieName: string;
  episodeName: string;
  movieSlug: string;
  vtts: string[];
  createdAt: string;
  views: number
}) => {
  const router = useRouter();
  const toast = useToast();
  const { data: session } = useSession();
  const { isOpen, onOpenData, onCloseData } = useDisclosureData<string>();
  const [reasonReport, setReasonReport] = useState<(string | number)[]>();
  const [sourceActive, setSourceActive] = useState<IEpisodeSource>(() => {
    return movieSource[0];
  });

  const handleNextMovie = () => {
    if (episodes) {
      const current = episodes.findIndex(
        (episode) => episode.slug === currentEpisodeSlug
      );
      if (typeof episodes[current + 1] !== "undefined") {
        router.push("/movie-watch/" + episodes[current + 1].slug);
        return;
      }
      toast({
        description: "Bạn đang ở tập mới nhất rồi!",
      });
    }
  };

  const reportMutation = useMutation({
    mutationFn: ({ ...data }: { slug: string; reason: (string | number)[] }) =>
      reportApi.movie({
        token: session?.user.token ?? "",
        data: {
          slug: data.slug,
          reason: data.reason,
        },
      }),
    onSuccess: ({ data }) => {
      toast({
        description: data.msg,
        status: "success",
      });
    },
  });

  const handleReport = () => {
    if (reasonReport) {
      reportMutation.mutate({
        slug: movieSlug,
        reason: reasonReport,
      });
    }
    onCloseData();
  };

  useEffect(() => {
    saveEpisode({
      movieId: 0,
      slug: currentEpisodeSlug,
    });
  }, [currentEpisodeSlug]);

  return (
    <>
      <ModalReport
        isOpen={isOpen}
        onCloseData={onCloseData}
        handleSubmit={handleReport}
      >
        <CheckboxGroup
          colorScheme="green"
          onChange={(vl) => setReasonReport(vl)}
        >
          <Stack spacing={2} direction="column">
            <Checkbox value="vietsub">Lỗi Việt sub</Checkbox>
            <Checkbox value="wrong_episode">Sai tập</Checkbox>
            <Checkbox value="cantWatch">Không thể xem</Checkbox>
          </Stack>
        </CheckboxGroup>
      </ModalReport>
      <Box>
        <AspectRatio rounded={5} overflow="hidden" ratio={16 / 9} bg="black">
          {sourceActive ? (
            <>
              {sourceActive.is_m3u8 === true ? (
                <PlyrDualCaption
                  vttList={vtts}
                  src={sourceActive.source_link}
                />
              ) : (
                <iframe
                  src={sourceActive.source_link}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen={true}
                ></iframe>
              )}
            </>
          ) : null}
        </AspectRatio>
        <Box my={2} textAlign={{ base: "center", md: "left" }}>
          <Heading
            as="h1"
            py={2}
            textTransform="uppercase"
            fontSize={{ base: "1rem", md: "1.3rem" }}
            fontWeight={700}
          >
            {movieName} - Tập {episodeName}
          </Heading>
          <HStack spacing={1}>
            <Text color="var(--color-gray)">
              {numberFormat(views, false)} Lượt xem -
            </Text>
            <Text color="var(--color-gray)">{dayjs(createdAt).fromNow()}</Text>
          </HStack>
        </Box>

        <HStack
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="space-between"
          mt="0.5rem"
        >
          <HStack>
            {movieSource.map((source) => (
              <Button
                key={source.source_link}
                variant={
                  sourceActive == source
                    ? "cinemaButton"
                    : "transparentCinemaButton"
                }
                onClick={() => setSourceActive(source)}
              >
                {source.server_name}
              </Button>
            ))}
          </HStack>

          <HStack>
            <BookmarkButton slug={movieSlug} />
            <IconButton
              icon={<FiFlag />}
              variant="cinemaButton"
              aria-label="report video"
              onClick={() => onOpenData(movieSlug)}
            />
            <Button
              rightIcon={<FiChevronsRight />}
              variant="cinemaButton"
              onClick={handleNextMovie}
            >
              Tiếp theo
            </Button>
          </HStack>
        </HStack>
      </Box>
    </>
  );
};

export default React.memo(Cinema);
