"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

import { eventDetailData } from "@/data/event-detail-data";
import { Link } from "@/i18n/navigation";

const WELCOME_MODAL_KEY = "welcome-modal-dismissed";
const FALLBACK_IMAGE_URL =
  "https://media.robocupkorea.org/images/events/fallback.jpg";

export default function WelcomeModal() {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  // 상세 이벤트에서 메인 이벤트 찾기
  const mainEventDetail = eventDetailData.find(
    (eventDetail) => eventDetail.showInMain && eventDetail.locale === locale,
  );

  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    if (typeof window === "undefined") return;

    const checkShouldShowModal = () => {
      const dismissedData = localStorage.getItem(WELCOME_MODAL_KEY);

      if (!dismissedData) {
        // 처음 방문하는 경우 모달 표시
        setIsOpen(true);
        return;
      }

      try {
        const { date } = JSON.parse(dismissedData);
        const dismissedDate = new Date(date);
        const today = new Date();

        // 날짜가 다른 경우 (다음날) 모달 다시 표시
        if (
          dismissedDate.getDate() !== today.getDate() ||
          dismissedDate.getMonth() !== today.getMonth() ||
          dismissedDate.getFullYear() !== today.getFullYear()
        ) {
          setIsOpen(true);
        }
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
    localStorage.setItem(WELCOME_MODAL_KEY, JSON.stringify({ date: today }));
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex min-w-[375px] items-center justify-center bg-black/50 p-4"
      onClick={closeModal}
    >
      <div
        className="w-full max-w-md bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 메인 이벤트 이미지 */}
        {mainEventDetail?.posterImageUrl ? (
          <Link
            href={`/events/${mainEventDetail.cmsPageId}`}
            prefetch
            onClick={closeModal}
            className="relative block aspect-[842/1191] w-full overflow-hidden"
          >
            <Image
              src={mainEventDetail.posterImageUrl}
              alt={mainEventDetail.title}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
              className="object-cover"
            />
          </Link>
        ) : (
          <Link
            // 공지사항으로 fallback 이동
            href={`/notices`}
            prefetch
            onClick={closeModal}
            className="relative block aspect-[842/1191] w-full overflow-hidden"
          >
            <Image
              src={FALLBACK_IMAGE_URL}
              alt={locale === "ko" ? "메인 이벤트 이미지" : "Main event image"}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
              className="object-cover opacity-70"
            />
            {/* fallback 이미지에 오버레이하여 메인 이벤트 제목을 표시 */}
            {mainEventDetail && (
              <div className="absolute left-1/2 top-1/4 w-full -translate-x-1/2 -translate-y-1/2 text-center text-2xl font-bold text-gray-800 md:text-3xl">
                {mainEventDetail.title}{" "}
                {locale === "ko" ? "개최안내" : "Event information"}
              </div>
            )}
          </Link>
        )}

        {/* 버튼 */}
        <div className="flex border-t border-gray-200">
          <button
            onClick={dontShowToday}
            className="flex-1 px-4 py-4 text-sm font-medium tracking-wide text-black transition hover:bg-gray-50"
          >
            {locale === "ko" ? "오늘 하루 보지 않기" : "Don't show today"}
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
