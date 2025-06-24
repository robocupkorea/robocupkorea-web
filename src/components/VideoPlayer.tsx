"use client";

import Hls from "hls.js";
import Image from "next/image";
import { type VideoHTMLAttributes, useEffect, useRef, useState } from "react";

type VideoPlayerProps = VideoHTMLAttributes<HTMLVideoElement> & {
  src: string; // 비디오
  fallbackSrc?: string; // fallback 이미지
};

const VideoPlayer = ({ src, fallbackSrc, ...props }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isReady, setIsReady] = useState(false); // 비디오 로드 완료 여부
  const [showFallback, setFallback] = useState(false); // fallback 이미지 표시 여부

  /**
   * HLS 초기화
   */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onCanPlay = () => {
      setIsReady(true);
      video.play().catch(console.warn);
    };
    video.addEventListener("canplay", onCanPlay);

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      hlsRef.current = hls;
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      hlsRef.current?.destroy();
    };
  }, [src]);

  /**
   * 모바일 화면 잠김/복귀 대응
   */
  useEffect(() => {
    const handleVisibility = () => {
      const video = videoRef.current;
      const hls = hlsRef.current;
      if (!video) return;

      if (document.visibilityState === "hidden") {
        // background 갈 때 다운로드 중단 및 일시정지
        hls?.stopLoad();
        video.pause();
      } else {
        // foreground 복귀 시 스트림 재시작 후 재생
        hls?.startLoad();
        video.play().catch(console.warn);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  /**
   * 브라우저 비디오 로딩 중단 대응 (iOS 저전력모드 대응)
   */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onSuspend = () => setFallback(true); // 비디오 로딩 중단 되면 fallback 이미지 표시
    video.addEventListener("suspend", onSuspend);

    return () => {
      video.removeEventListener("suspend", onSuspend);
    };
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        style={{
          opacity: isReady ? 1 : 0,
          transition: "opacity 100ms ease",
        }}
        {...props}
      />
      {showFallback && fallbackSrc && (
        <Image
          src={fallbackSrc}
          alt="Video fallback"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </>
  );
};

export default VideoPlayer;
