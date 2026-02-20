"use client";

import { ArrowRightIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

import pyeongchangLogo2 from "@/assets/images/pyeongchang-culture-and-tourism.jpg";
import VideoPlayer from "@/components/VideoPlayer";

const PROMO_MODAL_KEY = "promo-modal-dismissed";

/**
 * 홍보 모달 컴포넌트
 */
export default function PromoModal() {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    if (typeof window === "undefined") return;

    const checkShouldShowModal = () => {
      const dismissedData = localStorage.getItem(PROMO_MODAL_KEY);

      if (!dismissedData) {
        // 처음 방문하는 경우 모달 표시
        setIsOpen(true);
        return;
      }

      try {
        const { date } = JSON.parse(dismissedData);
        const dismissedDate = new Date(date).getTime();
        const today = new Date().getTime();
        const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;

        // 일주일이 지났는지 확인
        // - 일주일이 지나지 않았으면 모달을 표시하지 않음 (isOpen = false)
        // - 일주일이 지났으면 모달을 표시함 (isOpen = true)
        if (dismissedDate + sevenDaysInMs <= today) {
          setIsOpen(true);
        }
        // - 일주일이 지나지 않았으면 isOpen은 false로 유지됨
      } catch {
        // 파싱 에러 시 모달 표시
        setIsOpen(true);
      }
    };

    checkShouldShowModal();
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  const dontShowToday = () => {
    const today = new Date().toISOString();
    localStorage.setItem(PROMO_MODAL_KEY, JSON.stringify({ date: today }));
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex min-w-[375px] items-center justify-center bg-black/50 p-4"
      onClick={closeModal}
    >
      <div
        className="relative w-full max-w-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. 우측 상단 '배지' 형태의 바로가기 버튼 (이미지 위) */}
        <div className="absolute bottom-full right-0">
          <a
            href="https://tour.pc.go.kr/Home/index"
            target="_blank"
            className="flex h-12 items-center border-b border-l border-gray-200 bg-white"
          >
            {/* 로고 영역 */}
            <div className="relative h-full w-16">
              <Image
                src={pyeongchangLogo2}
                alt={
                  locale === "ko"
                    ? "평창문화관광"
                    : "Pyeongchang Culture and Tourism"
                }
                fill
                className="object-contain pl-1 md:pl-2"
              />
            </div>

            {/* 텍스트 영역 */}
            <div className="flex h-full items-center gap-1 pl-2 pr-4 text-xs font-semibold text-gray-700 sm:text-sm">
              {locale === "ko"
                ? "평창문화관광 바로가기"
                : "Visit Pyeongchang Tourism"}
              <ArrowRightIcon size={16} weight="regular" />
            </div>
          </a>
        </div>

        {/* 2. 메인 영상 */}
        <VideoPlayer
          src={`https://media.robocupkorea.org/videos/pyeongchang-promo/${locale}/2min.m3u8`}
          previewSrc="https://media.robocupkorea.org/videos/pyeongchang-promo/preview.png"
          autoPlay
          className="pointer-events-none aspect-[16/9] w-full"
          controls={false}
          loop
          muted
          playsInline
          preload="none"
          webkit-playsinline="true"
        />

        {/* 3. 하단 닫기 버튼들 */}
        <div className="flex border-t border-gray-200 bg-white">
          <button
            onClick={dontShowToday}
            className="flex-1 px-4 py-4 text-sm font-medium tracking-wide text-black transition hover:bg-gray-50"
          >
            {locale === "ko"
              ? "일주일 동안 보지 않기"
              : "Don't show for a week"}
          </button>
          <button
            onClick={closeModal}
            className="flex-1 border-l border-gray-200 px-4 py-4 text-sm font-medium tracking-wide text-black transition hover:bg-gray-50"
          >
            {locale === "ko" ? "닫기" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
