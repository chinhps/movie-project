import { useEffect, useRef } from "react";
import Hls from "hls.js";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import { AspectRatio } from "@chakra-ui/react";

export default function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const playerRef = useRef<Plyr | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const initializePlayer = () => {
      video.controls = true;

      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // This will run in Safari, where HLS is supported natively
        video.src = src;
      } else if (Hls.isSupported()) {
        // This will run in all other modern browsers
        hlsRef.current = new Hls();
        hlsRef.current.loadSource(src);
        hlsRef.current.attachMedia(video);
        playerRef.current = new Plyr(video, {});
      } else {
        console.error(
          "This is an old browser that does not support MSE https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API"
        );
      }
    };

    const cleanUpPlayer = () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };

    initializePlayer();

    return () => {
      cleanUpPlayer();
    };
  }, [src]);

  return (
    <AspectRatio height="100vh" _before={{}}>
      <video ref={videoRef} />
    </AspectRatio>
  );
}
