"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  AspectRatio,
  Box,
  Center,
  Flex,
  IconButton,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  FiMaximize2,
  FiMinimize2,
  FiPause,
  FiPlay,
  FiVolume1,
  FiVolume2,
  FiVolumeX,
} from "react-icons/fi";
import Hls from "hls.js";
import "./style.scss";
import useDeviceCheck from "@/hooks/useDeviceCheck";
import {
  ISubtitle,
  formatTime,
  handleAddSubtitles,
  handleFullScreenAll,
  parseVTT,
  removeAllSubtitles,
} from "./handelVideoPlayer";
import { useQueries } from "@tanstack/react-query";
import subtitleApi from "@/apis/subtitle";
import SubtitlesDesktop from "./SubtitlesDesktop";

const vttList: Array<string> = [
  "http://localhost/vietnamese.vtt",
  "http://localhost/english.vtt",
];

const DualSubtitlePlayer = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const vtts = useQueries({
    queries: vttList.map((vttUrl) => ({
      queryKey: ["post", vttUrl],
      queryFn: () => subtitleApi.vttDetail(vttUrl),
    })),
    combine: (results) => {
      return {
        data: results.map((result) => parseVTT(result.data ?? "")),
        pending: results.some((result) => result.isPending),
      };
    },
  });

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => video.pause());
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
        video.addEventListener("loadedmetadata", () => video.pause());
      }
    }
  }, [src]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  }, [videoRef]);

  return (
    <Box ref={playerContainerRef} position="relative" overflow="hidden">
      <AspectRatio w="100%" maxH="100vh" zIndex={1}>
        <video
          ref={videoRef}
          preload="auto"
          autoPlay
          playsInline
          onClick={togglePlay}
          crossOrigin="anonymous"
        ></video>
      </AspectRatio>
      <VStack position="absolute" bottom={0} left={0} right={0} zIndex={2}>
        <VStack
          mx="auto"
          color="white"
          fontSize={{ base: "13px", md: "1.3rem" }}
          gap={1}
          userSelect="none"
          mb={{ base: "5px", md: "0.2rem" }}
        >
          {videoRef.current && (
            <SubtitlesDesktop
              dataVtts={vtts.data}
              videoElement={videoRef.current}
            />
          )}
        </VStack>
        <VideoPlayerControls
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          videoRef={videoRef}
          playerContainerRef={playerContainerRef}
        />
      </VStack>
    </Box>
  );
};

export default React.memo(DualSubtitlePlayer);

interface VideoPlayerControlsProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  playerContainerRef: React.RefObject<HTMLDivElement>;
  isPlaying: boolean;
  togglePlay: () => void;
}

const VideoPlayerControls = ({
  videoRef,
  playerContainerRef,
  isPlaying,
  togglePlay,
}: VideoPlayerControlsProps) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const isMobile = useDeviceCheck();

  const handleFullScreen = useCallback(() => {
    const playerContainer = playerContainerRef.current;
    const video = videoRef.current as any;

    if (playerContainer && video) {
      if (!isFullScreen) {
        handleFullScreenAll(playerContainer, video, () => {
          if (isMobile === "mobile") {
            handleAddSubtitles({
              videoElement: video,
              label: "Tiếng việt",
              language: "vn",
              subtitlesData: [
                {
                  startTime: 0,
                  endTime: 90,
                  text: "hehe \n Hello may be",
                },
              ],
            });
          }
        });
      } else if (isFullScreen && document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullScreen((prev) => !prev);
    }
  }, [isFullScreen, playerContainerRef, videoRef, isMobile]);

  return (
    <Box width="100%" px={{ base: 1, md: "1rem" }} py={1} bg="#20242c98">
      <Flex gap={{ base: 1, md: "0.8rem" }}>
        <IconButton
          variant="buttonPlayer"
          icon={isPlaying ? <FiPause /> : <FiPlay />}
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
        />
        <VideoControlVolume videoRef={videoRef} />
        <VideoControlTimeline
          videoRef={videoRef}
          setIsFullScreen={setIsFullScreen}
        />
        <IconButton
          variant="buttonPlayer"
          icon={isFullScreen ? <FiMinimize2 /> : <FiMaximize2 />}
          onClick={handleFullScreen}
          aria-label={isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        />
      </Flex>
    </Box>
  );
};

const VideoControlTimeline = ({
  videoRef,
  setIsFullScreen,
}: {
  videoRef: React.RefObject<HTMLVideoElement>;
  setIsFullScreen: (status: boolean) => void;
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleSliderChange = useCallback(
    (value: number) => {
      const video = videoRef.current;
      if (video) {
        video.currentTime = value;
        setCurrentTime(value);
      }
    },
    [videoRef]
  );

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleTimeUpdate = () => setCurrentTime(video.currentTime);
      const handleLoadedMetadata = () => setDuration(video.duration);
      const videoExitedFullscreen = () => {
        if (
          !(document as any).fullScreenElement ||
          !(document as any).webkitIsFullScreen == true ||
          !(document as any).mozFullScreen ||
          !(document as any).msFullscreenElement
        ) {
          removeAllSubtitles(video);
          setIsFullScreen(false);
        }
      };

      video.addEventListener("timeupdate", handleTimeUpdate);
      video.addEventListener("loadedmetadata", handleLoadedMetadata);
      video.addEventListener(
        "webkitendfullscreen",
        videoExitedFullscreen,
        false
      );

      return () => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        video.removeEventListener("webkitendfullscreen", videoExitedFullscreen);
      };
    }
  }, [setIsFullScreen, videoRef]);
  // console.log("timeline");

  return (
    <>
      <Center mr="1rem">
        <Text color="white">{formatTime(currentTime)}</Text>
      </Center>
      <Slider
        value={currentTime}
        min={0}
        max={duration}
        step={1}
        onChange={handleSliderChange}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </>
  );
};

const VideoControlVolume = ({
  videoRef,
}: {
  videoRef: React.RefObject<HTMLVideoElement>;
}) => {
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [showSlider, setShowSlider] = useState(false);

  const handleVolumeChange = useCallback(
    (value: number) => {
      const video = videoRef.current;
      if (video) {
        video.volume = value / 100;
        setVolume(value);
      }
    },
    [videoRef]
  );

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      if (isMuted || video.volume === 0) {
        video.volume = 1;
        setVolume(100);
        setIsMuted(false);
      } else {
        video.volume = 0;
        setVolume(0);
        setIsMuted(true);
      }
    }
  }, [isMuted, videoRef]);

  return (
    <Box
      position="relative"
      width="40px"
      onMouseEnter={() => setShowSlider(true)}
      onMouseLeave={() => setShowSlider(false)}
    >
      <IconButton
        variant="buttonPlayer"
        icon={
          volume > 60 ? (
            <FiVolume2 />
          ) : volume > 0 ? (
            <FiVolume1 />
          ) : (
            <FiVolumeX />
          )
        }
        onClick={toggleMute}
        aria-label={isMuted ? "Default" : "Mute"}
      />
      {showSlider && (
        <Center position="absolute" bottom="110%" left={0} right={0} p="0.5rem">
          <Slider
            height="100px"
            mx="auto"
            orientation="vertical"
            aria-label="volume-slider"
            value={volume}
            min={0}
            max={100}
            onChange={handleVolumeChange}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Center>
      )}
    </Box>
  );
};
