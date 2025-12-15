"use client";

import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { useCallback, useEffect, useRef, useState } from "react";

import LeagueCard from "@/components/LeagueCard";
import type { League, LeagueDivision } from "@/lib/prisma";

export default function ScrollableLeagueSection({
  league,
  divisions,
}: {
  league: League;
  divisions: LeagueDivision[];
}) {
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

  const scrollLeft = useCallback(() => {
    if (scrollRef.current) {
      const scrollDistance = Math.min(200, window.innerWidth * 0.4);
      scrollRef.current.scrollBy({ left: -scrollDistance, behavior: "smooth" });
    }
  }, []);

  const scrollRight = useCallback(() => {
    if (scrollRef.current) {
      const scrollDistance = Math.min(200, window.innerWidth * 0.4);
      scrollRef.current.scrollBy({ left: scrollDistance, behavior: "smooth" });
    }
  }, []);

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
    <section>
      <div className="mb-12 text-center">
        <h2
          id={`league-${league.id}-title`}
          className="text-3xl font-bold text-gray-900"
        >
          {league.name}
        </h2>
      </div>

      <div className="relative">
        {/* 왼쪽 그라데이션 (모바일용) */}
        {canScrollLeft && (
          <div className="pointer-events-none absolute left-[-1px] top-0 z-10 h-full w-8 bg-gradient-to-r from-white to-transparent opacity-80 sm:hidden" />
        )}

        {/* 왼쪽 화살표 버튼 (데스크탑용) */}
        {canScrollLeft && (
          <button
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl sm:flex"
            disabled={!canScrollLeft}
          >
            <CaretLeftIcon size={20} className="text-gray-700" />
          </button>
        )}

        <div
          ref={scrollRef}
          className="scrollbar-hide flex gap-4 overflow-x-auto"
        >
          {divisions.map((leagueDivision: LeagueDivision) => (
            <LeagueCard
              key={leagueDivision.id}
              league={league}
              leagueDivision={leagueDivision}
              fullWidth={false}
            />
          ))}
        </div>

        {/* 오른쪽 화살표 버튼 (데스크탑용) */}
        {canScrollRight && (
          <button
            onClick={scrollRight}
            className="absolute right-2 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl sm:flex"
            disabled={!canScrollRight}
          >
            <CaretRightIcon size={20} className="text-gray-700" />
          </button>
        )}

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

        {/* 오른쪽 그라데이션 (모바일용) */}
        {canScrollRight && (
          <div className="pointer-events-none absolute right-[-1px] top-0 z-10 h-full w-8 bg-gradient-to-l from-white to-transparent opacity-80 sm:hidden" />
        )}
      </div>
    </section>
  );
}
