"use client";

import React, { MutableRefObject, useEffect, useRef } from "react";
import Hls from "hls.js";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

const VideoPlayer = React.forwardRef<
  HTMLVideoElement,
  { src: string; playerRef: MutableRefObject<Plyr | null> }
>(({ src, playerRef }, ref) => {
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const video = (ref as MutableRefObject<HTMLVideoElement | null>).current;
    if (!video) return;

    const initializePlayer = async () => {
      video.controls = true;
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
      } else if (Hls.isSupported()) {
        const PlyrDynamic = await import("plyr");
        hlsRef.current = new Hls({
          maxBufferLength: 30, // Độ dài bộ đệm tối đa (giây)
          maxMaxBufferLength: 60, // Độ dài bộ đệm tối đa trong quá trình phát lại (giây)
          maxBufferSize: 60 * 1000 * 1000, // Kích thước bộ đệm tối đa (byte)
          maxBufferHole: 0.5, // Kích thước lỗ hổng bộ đệm tối đa (giây)
        });
        hlsRef.current.loadSource(src);
        hlsRef.current.attachMedia(video);

        const Plyr2 = PlyrDynamic.default;
        playerRef.current = new Plyr2(video, { captions: { active: true } });
      }
    };

    const cleanUpPlayer = () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };

    initializePlayer();

    return () => {
      cleanUpPlayer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  return <video ref={ref} />;
});

VideoPlayer.displayName = "VideoPlayer";

export default VideoPlayer;
