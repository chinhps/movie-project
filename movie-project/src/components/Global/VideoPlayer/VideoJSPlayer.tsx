import videojs from "video.js";
import "videojs-contrib-hls";

// Styles
import "video.js/dist/video-js.css";
import { useEffect, useRef } from "react";

interface IVideoPlayerProps {
  options: any;
}

const initialOptions: any = {
  controls: true,
  fluid: true,
  controlBar: {
    volumePanel: {
      inline: false,
    },
  },
  html5: {
    hls: {
      withCredentials: false,
      overrideNative: true,
      GOAL_BUFFER_LENGTH: 30, // Bộ đệm cần thiết để bắt đầu video
      MAX_GOAL_BUFFER_LENGTH: 60, // Bộ đệm cần thiết trong quá trình phát lại
    },
  },
};

const VideoJSPlayer: React.FC<IVideoPlayerProps> = ({ options }) => {
  const videoNode = useRef<HTMLVideoElement | null>(null);
  const player = useRef<any>();

  useEffect(() => {
    if (player && videoNode.current) {
      player.current = videojs(videoNode.current, {
        ...initialOptions,
        ...options,
      }).ready(function () {

      });
      return () => {
        if (player.current) {
          player.current.dispose();
        }
      };
    }
  }, [options]);

  return <video ref={videoNode} className="video-js" />;
};

export default VideoJSPlayer;
