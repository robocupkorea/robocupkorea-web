"use client";

import {
  ArrowRightIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  CaretDownIcon,
  GraduationCapIcon,
  MapPinIcon,
  TrophyIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import Image from "next/image";

import sponsorBanner from "@/assets/images/sponsor-banner.jpg";
import AccountGroupIcon from "@/assets/svg/Account-Group-1--Streamline-Cyber.svg";
import BadgeStarIcon from "@/assets/svg/Badge-Star-2--Streamline-Cyber.svg";
import ComputerImacSmileyFaceIcon from "@/assets/svg/Computer-Imac-Smiley-Face--Streamline-Cyber.svg";
import VideoPlayer from "@/components/VideoPlayer";
import { eventContentData } from "@/data/eventContentData";
import { eventData } from "@/data/eventData";
import { leagueData } from "@/data/leagueData";
import { LeagueDivision, leagueDivisionData } from "@/data/leagueDivisionData";
import { formatDateRange } from "@/utils/date";

export default function Home() {
  const mainEvent = eventContentData.find(
    (eventContent) => eventContent.showInMain,
  );
  const mainEventDate = eventData.find(
    (event) => event.id === mainEvent?.eventId,
  );

  return (
    <>
      <div className="relative h-[calc(100svh-64px)] max-h-[1000px] w-full md:h-[calc(100svh-80px)]">
        <VideoPlayer
          src="https://media.robocupkorea.org/videos/landing/intro.m3u8"
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/60" />
        <div className="absolute inset-x-0 top-12">
          <div className="container mx-auto flex max-w-7xl flex-col gap-8 px-4 text-white md:px-8 xl:px-20">
            <h1 className="text-3xl font-black sm:text-6xl lg:text-6xl">
              {mainEvent?.title}
            </h1>
            <div className="flex flex-col gap-3 text-lg">
              <div className="flex items-center gap-2">
                <CalendarIcon size={24} weight="fill" />
                <time className="font-medium">
                  {formatDateRange(
                    mainEventDate?.dateStart || "",
                    mainEventDate?.dateEnd || "",
                  )}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon size={24} weight="fill" />
                <span className="font-medium">{mainEvent?.location}</span>
              </div>
            </div>
            <div>
              <button className="flex h-12 items-center justify-center gap-1.5 border border-gray-500 bg-white px-6 font-medium text-black hover:bg-gray-100">
                더 알아보기 <ArrowRightIcon size={24} weight="thin" />
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="duration-600 flex animate-bounce items-center justify-center rounded-full bg-white p-1 text-black">
            <CaretDownIcon weight="light" className="h-8 w-8" />
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex-1">
            <p className="text-md mb-2 text-gray-500">협회 소개</p>
            <h2 className="text-4xl font-bold">사단법인 한국로보컵협회</h2>
          </div>

          <div className="flex-1">
            <p className="mb-6 break-keep leading-relaxed text-gray-800">
              사단법인 한국로보컵협회는 로봇을 연구하는 학생들을 위해 국가적 및
              국제적 로봇 이벤트인 로보컵 리그를 주최하며, 프로젝트 중심의
              교육을 증진하는 비영리 단체입니다.
            </p>
            <button className="flex h-12 items-center justify-center gap-1.5 border border-gray-500 bg-white px-6 font-medium text-black hover:bg-gray-100">
              더 알아보기
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 py-24 md:px-8 xl:px-20">
          <div className="mb-12 text-center">
            <p className="text-md mb-2 text-gray-500">주요 통계</p>
            <h2 className="text-3xl font-bold">
              국내에서 매년 개최되는 로보컵 대회
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center border bg-white p-8">
              <UsersIcon size={48} weight="thin" />
              <p className="mt-4 text-3xl font-bold">500+</p>
              <p className="mt-2 break-keep text-center text-gray-600">
                매회 500명 이상의 참가자 수
              </p>
            </div>
            <div className="flex flex-col items-center border bg-white p-8">
              <TrophyIcon size={48} weight="thin" />
              <p className="mt-4 text-3xl font-bold">17+</p>
              <p className="mt-2 break-keep text-center text-gray-600">
                현재까지 개최된 대회 수
              </p>
            </div>
            <div className="flex flex-col items-center border bg-white p-8">
              <BuildingOfficeIcon size={48} weight="thin" />
              <p className="mt-4 text-3xl font-bold">10+</p>
              <p className="mt-2 break-keep text-center text-gray-600">
                함께한 후원사의 수
              </p>
            </div>
            <div className="flex flex-col items-center border bg-white p-8">
              <GraduationCapIcon size={48} weight="thin" />
              <p className="mt-4 text-3xl font-bold">19+</p>
              <p className="mt-2 break-keep text-center text-gray-600">
                협회 공식 인증 교육원 수
              </p>
            </div>
          </div>
          <div>
            <p className="mt-8 text-center text-xs text-gray-500">
              *한국로보컵 기준 (2025년 업데이트)
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-24 text-center md:px-8 xl:px-20">
        <div className="mb-12 text-center">
          <p className="text-md mb-2 text-gray-500">로보컵 소개</p>
          <h2 className="text-3xl font-bold">로보컵 리그의 주요 활동과 목표</h2>
        </div>
        <p className="mx-auto mb-12 max-w-2xl leading-relaxed text-gray-700">
          로보컵 리그는 매년 정기적으로 개최되는 로봇·AI 대회를 통해 참가자들이
          실제 환경에서 기술을 적용하고, 협업과 문제 해결 능력을 기를 수 있는
          기회를 제공합니다.
        </p>

        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center">
            <div className="relative mb-4 h-40 w-40">
              <Image
                src={AccountGroupIcon}
                alt="Computer Imac Smiley Face Streamline Icon"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-center leading-relaxed text-gray-700">
              협력과 아이디어 공유를 통한
              <br />팀 공동의 목표 달성
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative mb-4 h-40 w-40">
              <Image
                src={ComputerImacSmileyFaceIcon}
                alt="Business Idea Light Bulb Streamline Icon"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-center leading-relaxed text-gray-700">
              문제 해결을 위한 창의적 알고리즘 구현
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative mb-4 h-40 w-40">
              <Image
                src={BadgeStarIcon}
                alt="Globe 1 Streamline Icon"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-center leading-relaxed text-gray-700">
              국제 로보컵 대회 참가 기회
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button className="flex h-12 items-center justify-center gap-1.5 border border-gray-500 bg-white px-6 font-medium text-black hover:bg-gray-100">
            더 알아보기
          </button>
        </div>
      </div>

      <div className="bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 py-24 md:px-8 xl:px-20">
          <div className="mb-16 flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <p className="text-md mb-2 text-gray-500">연혁</p>
              <h2 className="text-3xl font-bold">한국로보컵협회가 걸어온 길</h2>
            </div>

            <div className="flex justify-center md:flex-1 md:justify-start">
              <ol className="relative border-s border-gray-300">
                {eventData
                  .slice(-5, -1)
                  .reverse()
                  .map((event, idx, arr) => {
                    const content = eventContentData.find(
                      (c) => c.eventId === event.id,
                    );
                    const showYear =
                      idx === 0 || arr[idx - 1].year !== event.year;

                    return (
                      <li
                        key={event.id}
                        className="mb-10 ml-4 w-full md:w-auto"
                      >
                        {showYear && (
                          <>
                            <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-gray-700 bg-gray-700" />
                            <div className="mb-4">
                              <h3 className="text-2xl font-bold leading-none text-gray-700">
                                {event.year}
                              </h3>
                            </div>
                          </>
                        )}

                        <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-gray-300 bg-gray-300" />
                        <time className="text-sm text-gray-500">
                          {formatDateRange(event.dateStart, event.dateEnd)}
                        </time>
                        <h3 className="mt-0.5 text-xl font-semibold">
                          {content?.title}
                        </h3>
                        <p className="mb-6 text-gray-500">
                          {content?.location}
                        </p>
                      </li>
                    );
                  })}
              </ol>
            </div>
          </div>

          <div className="flex justify-center">
            <button className="flex h-12 items-center justify-center gap-1.5 border border-gray-500 bg-white px-6 font-medium text-black hover:bg-gray-100">
              연혁 더보기
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-24 md:px-8 xl:px-20">
        <div className="mb-12 text-center">
          <p className="text-md mb-2 text-gray-500">로보컵 리그</p>
          <h2 className="text-3xl font-bold">리그를 탐색해보세요</h2>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {leagueDivisionData
            .slice(0, 3)
            .map((leagueDivision: LeagueDivision) => {
              const league = leagueData.find(
                (league) => league.id === leagueDivision.leagueId,
              );

              return (
                <div
                  key={leagueDivision.id}
                  className="group relative h-full w-full cursor-pointer border bg-white hover:bg-gray-100"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={leagueDivision.imageUrl}
                      alt={leagueDivision.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-5">
                    <div className="mb-2">
                      <p className="text-sm font-medium tracking-wide text-gray-500">
                        {league?.name}
                      </p>
                      <h3 className="mt-0.5 line-clamp-2 text-xl font-bold text-gray-900">
                        {leagueDivision.name}
                      </h3>
                    </div>

                    <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
                      {leagueDivision.description}
                    </p>

                    <div className="mt-5 flex items-center gap-1">
                      <span className="font-medium text-gray-900">
                        자세히 보기
                      </span>
                      <ArrowRightIcon
                        size={16}
                        weight="regular"
                        className="text-gray-900"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="flex justify-center">
          <button className="flex h-12 items-center justify-center gap-1.5 border border-gray-500 bg-white px-6 font-medium text-black hover:bg-gray-100">
            리그 더보기
          </button>
        </div>
      </div>

      <div className="bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 py-24 text-center md:px-8 xl:px-20">
          <div className="mb-12 text-center">
            <p className="text-md mb-2 text-gray-500">로보컵 대회</p>
            <h2 className="text-3xl font-bold">대회에 도전해보세요</h2>
          </div>

          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {eventContentData
              .filter((eventContent) => eventContent.showInEventPage)
              .map((eventContent) => {
                const event = eventData.find(
                  (event) => event.id === eventContent.eventId,
                );

                return (
                  <div
                    key={eventContent.id}
                    className="group relative h-full w-full cursor-pointer border bg-white hover:bg-gray-100"
                  >
                    <div className="relative aspect-[842/1191] w-full overflow-hidden">
                      <Image
                        src={eventContent.poster_image_url ?? ""}
                        alt={eventContent.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="p-5 text-left">
                      <h3 className="line-clamp-2 text-xl font-bold text-gray-900">
                        {eventContent.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-gray-600">
                        {eventContent.location}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {event &&
                          formatDateRange(event.dateStart, event.dateEnd)}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="flex justify-center">
            <button className="flex h-12 items-center justify-center gap-1.5 border border-gray-500 bg-white px-6 font-medium text-black hover:bg-gray-100">
              대회 더보기
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-24 md:px-8 xl:px-20">
        <div className="relative min-h-72">
          <div className="absolute inset-0">
            <Image
              src={sponsorBanner}
              alt="Sponsor Banner"
              fill
              className="object-cover object-[center_20%]"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative flex h-full w-full flex-col items-start justify-between gap-20 px-8 py-12">
            <p className="break-keep text-center text-base font-medium leading-relaxed text-white md:text-left">
              한국로보컵협회는 2013년부터 10년 이상 로보컵 대회를 운영해 온
              비영리 단체입니다.
              <br />
              모든 후원금은 로봇 꿈나무들을 양성하고 AI 및 로보틱스 교육의
              증진을 위한 다양한 목적에 사용됩니다.
            </p>
            <div className="flex w-full justify-center md:justify-end">
              <button className="flex h-12 items-center justify-center gap-1.5 border border-white bg-transparent px-6 font-medium text-white hover:bg-white/10">
                후원 문의하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
