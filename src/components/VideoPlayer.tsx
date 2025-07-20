"use client";

import Hls from "hls.js";
import Image from "next/image";
import { type VideoHTMLAttributes, useEffect, useRef, useState } from "react";

type VideoPlayerProps = VideoHTMLAttributes<HTMLVideoElement> & {
  src: string; // 비디오
  previewSrc?: string; // 비디오 첫 프레임 이미지
  fallbackSrc?: string; // fallback 이미지
  className?: string;
};

const VideoPlayer = ({
  src,
  previewSrc,
  fallbackSrc,
  className,
  ...props
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isReady, setIsReady] = useState(false); // 비디오 로드 완료 여부
  const [showFallback, setFallback] = useState(false); // fallback 이미지 표시 여부
  const [isMobile, setIsMobile] = useState(false); // 모바일 화면 여부 (768px 이하)
  const [imageLoaded, setImageLoaded] = useState(false); // 이미지 로드 완료 여부
  const [previewLoaded, setPreviewLoaded] = useState(false); // 프리뷰 이미지 로드 완료 여부

  /**
   * 디바운스된 리사이즈 핸들러
   */
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // 초기 체크
    checkScreenSize();

    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkScreenSize, 100);
    };

    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  /**
   * HLS 초기화
   */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || isMobile) return;

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
      hlsRef.current = null;
    };
  }, [src, isMobile]);

  /**
   * 모바일 화면 잠김/복귀 대응
   */
  useEffect(() => {
    if (isMobile) return;

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
  }, [isMobile]);

  /**
   * 브라우저 비디오 로딩 중단 대응 (iOS 저전력모드 대응)
   */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || isMobile) return;

    const onSuspend = () => setFallback(true); // 비디오 로딩 중단 되면 fallback 이미지 표시
    video.addEventListener("suspend", onSuspend);

    return () => {
      video.removeEventListener("suspend", onSuspend);
    };
  }, [isMobile]);

  /**
   * 화면 크기 변경 시 상태 초기화
   */
  useEffect(() => {
    if (isMobile) {
      // 모바일로 전환 시 비디오 정리
      hlsRef.current?.destroy();
      hlsRef.current = null;
      setFallback(false);
    } else {
      // 데스크톱으로 전환 시 fallback 해제
      setFallback(false);
    }
  }, [isMobile]);

  // 모바일에서는 fallback 이미지만 표시
  if (isMobile && fallbackSrc) {
    return (
      <Image
        src={fallbackSrc}
        alt="Mobile fallback image"
        fill
        onLoad={() => setImageLoaded(true)}
        className={`transition-opacity duration-300 ease-in-out ${
          imageLoaded ? "opacity-100" : "opacity-0"
        } ${className}`}
      />
    );
  }

  return (
    <>
      {/* 랜딩 비디오의 프리뷰 이미지 */}
      {previewSrc && !isReady && (
        <Image
          src={previewSrc}
          alt="Video preview"
          fill
          priority
          onLoad={() => setPreviewLoaded(true)}
          className={`transition-opacity duration-300 ease-in-out ${
            previewLoaded ? "opacity-100" : "opacity-0"
          } ${className}`}
        />
      )}

      {/* 랜딩 비디오 */}
      <video ref={videoRef} className={className} {...props} />

      {/* fallback 이미지 (모바일 대응) */}
      {showFallback && fallbackSrc && (
        <Image
          src={fallbackSrc}
          alt="Video fallback"
          fill
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </>
  );
};

export default VideoPlayer;
