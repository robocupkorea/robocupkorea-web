"use client";

import { ArrowRightIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

import type { League, LeagueDivision } from "@/types/leagues";

export default function ScrollableLeagueSection({
  league,
  divisions,
}: {
  league: League;
  divisions: LeagueDivision[];
}) {
  const locale = useLocale();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;

    const {
      scrollLeft, // 현재 가로 스크롤 위치
      scrollWidth, // 스크롤 가능한 총 너비
      clientWidth, // 현재 보이는 영역의 너비
    } = scrollRef.current;

    const isScrollable = scrollWidth > clientWidth; // 스크롤 가능한지 확인
    setIsScrollable(isScrollable);

    const error = 1; // 오차 허용치
    setCanScrollLeft(scrollLeft > error); // 왼쪽으로 스크롤 가능한지 확인
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - error); // 오른쪽으로 스크롤 가능한지 확인

    if (isScrollable) {
      const scrollRange = scrollWidth - clientWidth; // 스크롤 가능한 총 너비 - 현재 보이는 영역의 너비

      // index 계산
      const progress = scrollLeft / scrollRange;
      const index = Math.round(progress * (divisions.length - 1));
      setCurrentIndex(index);
    } else {
      setCurrentIndex(0);
    }
  }, [divisions.length]);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      // throttle을 사용하여 이벤트 핸들러의 호출 빈도를 조절
      let timeoutId: NodeJS.Timeout;
      const throttledCheckScroll = () => {
        // 이전 타임아웃이 있으면 취소
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(checkScroll, 10); // 10ms 간격으로 조절
      };

      scrollElement.addEventListener("scroll", throttledCheckScroll); // 스크롤 감지
      window.addEventListener("resize", throttledCheckScroll); // 창 크기 변경 감지

      checkScroll();

      return () => {
        scrollElement.removeEventListener("scroll", throttledCheckScroll);
        window.removeEventListener("resize", throttledCheckScroll);
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }
  }, [checkScroll]);

  return (
    <div>
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900">{league.name}</h2>
      </div>

      <div className="relative">
        {/* 왼쪽 그라데이션 */}
        {canScrollLeft && (
          <div className="pointer-events-none absolute left-[-1px] top-0 z-10 h-full w-12 bg-gradient-to-r from-white to-transparent" />
        )}

        <div
          ref={scrollRef}
          className="scrollbar-hide flex gap-4 overflow-x-auto"
        >
          {divisions.map((leagueDivision: LeagueDivision) => (
            <div
              key={leagueDivision.id}
              className="group w-[calc(100vw-6rem)] min-w-64 flex-shrink-0 cursor-pointer border bg-white hover:bg-gray-100 sm:w-64 md:w-72 lg:w-80"
            >
              <div className="relative h-40 w-full sm:h-48">
                <Image
                  src={leagueDivision.imageUrl}
                  alt={leagueDivision.name}
                  fill
                  sizes="(max-width: 640px) calc(100vw - 6rem), (max-width: 768px) 256px, (max-width: 1024px) 288px, 375px"
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <div className="mb-2">
                  <h3 className="mt-0.5 line-clamp-2 text-lg font-bold text-gray-900">
                    {leagueDivision.name}
                  </h3>
                </div>

                <div className="mt-4 flex items-center gap-1">
                  <span className="text-sm font-medium text-gray-900">
                    {locale === "ko" ? "자세히 보기" : "View Details"}
                  </span>
                  <ArrowRightIcon
                    size={14}
                    weight="regular"
                    className="text-gray-900"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 스크롤 인디케이터 */}
        {isScrollable && (
          <div className="mt-4 flex justify-center">
            <div className="flex gap-1">
              {divisions.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 w-8 rounded-full transition-colors duration-200 ${
                    index === currentIndex ? "bg-gray-600" : "bg-gray-200"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        )}

        {/* 오른쪽 그라데이션 */}
        {canScrollRight && (
          <div className="pointer-events-none absolute right-[-1px] top-0 z-10 h-full w-12 bg-gradient-to-l from-white to-transparent" />
        )}
      </div>
    </div>
  );
}
