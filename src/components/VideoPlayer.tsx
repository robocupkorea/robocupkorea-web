"use client";

import Hls from "hls.js";
import { type VideoHTMLAttributes, useEffect, useRef } from "react";

type VideoPlayerProps = VideoHTMLAttributes<HTMLVideoElement> & {
  src: string;
};

const VideoPlayer = ({ src, ...props }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoRef.current);
        return () => {
          hls.destroy();
        };
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        videoRef.current.src = src;
      }
    }
  }, [src]);

  return <video ref={videoRef} {...props} />;
};

export default VideoPlayer;
