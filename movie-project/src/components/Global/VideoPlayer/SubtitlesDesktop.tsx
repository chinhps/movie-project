"use client";

import React, { useEffect, useRef } from "react";
import { ISubtitle } from "./handelVideoPlayer";
import { Box } from "@chakra-ui/react";
import "./style.scss";

function SubtitlesDesktop({
  dataVtts,
  videoElement,
}: {
  dataVtts: Array<Array<ISubtitle>>;
  videoElement: HTMLVideoElement;
}) {
  const caption1Ref = useRef<HTMLDivElement>(null);
  const caption2Ref = useRef<HTMLDivElement>(null);

  const getCaptionForTime = (captions: Array<ISubtitle>, time: number) => {
    return (
      captions.find(
        (caption) => time >= caption.startTime && time <= caption.endTime
      )?.text || ""
    );
  };

  const updateCaptionRef = (
    captionRef: React.RefObject<HTMLDivElement>,
    caption: string
  ) => {
    if (captionRef.current) {
      captionRef.current.innerText = caption;
      captionRef.current.style.display = caption ? "block" : "none";
    }
  };

  useEffect(() => {
    const updateCaptions = (time: number) => {
      const caption1 = getCaptionForTime(dataVtts[0], time);
      const caption2 = getCaptionForTime(dataVtts[1], time);

      updateCaptionRef(caption1Ref, caption1);
      updateCaptionRef(caption2Ref, caption2);
    };

    videoElement.addEventListener("timeupdate", (e) =>
      updateCaptions((e.target as HTMLVideoElement).currentTime)
    );

    return () => {
      videoElement.removeEventListener("timeupdate", (e) =>
        updateCaptions((e.target as HTMLVideoElement).currentTime)
      );
    };
  }, [dataVtts, videoElement]);
  return (
    <>
      <Box ref={caption1Ref} textAlign="center" className="subtitle-item"></Box>
      <Box ref={caption2Ref} textAlign="center" className="subtitle-item"></Box>
    </>
  );
}

export default React.memo(SubtitlesDesktop);
