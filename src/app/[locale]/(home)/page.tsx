import {
  ArrowRightIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  CaretDownIcon,
  GraduationCapIcon,
  MapPinIcon,
  TrophyIcon,
  UsersIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { getLocale, getMessages } from "next-intl/server";

import sponsorBanner from "@/assets/images/sponsor-banner.jpg";
import AccountGroupIcon from "@/assets/svg/Account-Group-1--Streamline-Cyber.svg";
import BadgeStarIcon from "@/assets/svg/Badge-Star-2--Streamline-Cyber.svg";
import ComputerImacSmileyFaceIcon from "@/assets/svg/Computer-Imac-Smiley-Face--Streamline-Cyber.svg";
import VideoPlayer from "@/components/VideoPlayer";
import { eventData } from "@/data/eventData";
import { eventDetailData } from "@/data/eventDetailData";
import { leagueData } from "@/data/leagueData";
import { leagueDivisionData } from "@/data/leagueDivisionData";
import { LeagueDivision } from "@/types/leagues";
import { formatDateRange } from "@/utils/date";

export default async function Home() {
  const locale = await getLocale();

  const { home } = await getMessages();

  const mainEvent = eventDetailData.find(
    (eventDetail) => eventDetail.showInMain && eventDetail.locale === locale,
  );
  const mainEventDate = eventData.find(
    (event) => event.id === mainEvent?.eventId,
  );

  return (
    <>
      <div className="relative h-[calc(100svh-64px)] max-h-[1000px] w-full bg-black md:h-[calc(100svh-80px)]">
        <VideoPlayer
          src="https://media.robocupkorea.org/videos/landing/intro.m3u8"
          fallbackSrc="https://media.robocupkorea.org/images/landing/fallback.png"
          autoPlay
          className="pointer-events-none h-full w-full object-cover"
          controls={false}
          loop
          muted
          playsInline
          preload="none"
          style={{ overflowClipMargin: "content-box 0px" }}
          webkit-playsinline="true"
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
                    locale,
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
                {home.button.learnMore}
                <ArrowRightIcon size={24} weight="thin" />
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
            <p className="text-md mb-2 text-gray-500">{home.intro.section}</p>
            <h2 className="text-4xl font-bold">{home.intro.association}</h2>
          </div>

          <div className="flex-1">
            <p className="mb-6 break-keep leading-relaxed text-gray-800">
              {home.intro.description}
            </p>
            <button className="flex h-12 items-center justify-center gap-1.5 border border-gray-500 bg-white px-6 font-medium text-black hover:bg-gray-100">
              {home.button.learnMore}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 py-24 md:px-8 xl:px-20">
          <div className="mb-12 text-center">
            <p className="text-md mb-2 text-gray-500">{home.stats.section}</p>
            <h2 className="text-3xl font-bold">{home.stats.title}</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center border bg-white p-8">
              <UsersIcon size={48} weight="thin" />
              <p className="mt-4 text-3xl font-bold">
                {home.stats.participants.value}
              </p>
              <p className="mt-2 break-keep text-center text-gray-600">
                {home.stats.participants.label}
              </p>
            </div>
            <div className="flex flex-col items-center border bg-white p-8">
              <TrophyIcon size={48} weight="thin" />
              <p className="mt-4 text-3xl font-bold">
                {home.stats.events.value}
              </p>
              <p className="mt-2 break-keep text-center text-gray-600">
                {home.stats.events.label}
              </p>
            </div>
            <div className="flex flex-col items-center border bg-white p-8">
              <BuildingOfficeIcon size={48} weight="thin" />
              <p className="mt-4 text-3xl font-bold">
                {home.stats.sponsors.value}
              </p>
              <p className="mt-2 break-keep text-center text-gray-600">
                {home.stats.sponsors.label}
              </p>
            </div>
            <div className="flex flex-col items-center border bg-white p-8">
              <GraduationCapIcon size={48} weight="thin" />
              <p className="mt-4 text-3xl font-bold">
                {home.stats.schools.value}
              </p>
              <p className="mt-2 break-keep text-center text-gray-600">
                {home.stats.schools.label}
              </p>
            </div>
          </div>
          <div>
            <p className="mt-8 text-center text-xs text-gray-500">
              {home.stats.note}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-24 md:px-8 xl:px-20">
        <div className="mb-12 text-center">
          <p className="text-md mb-2 text-gray-500">
            {home.aboutLeague.section}
          </p>
          <h2 className="text-3xl font-bold">{home.aboutLeague.title}</h2>
        </div>
        <div className="text-center">
          <p className="mx-auto mb-12 max-w-2xl leading-relaxed text-gray-700">
            {home.aboutLeague.description}
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center">
            <div className="relative mb-4 h-40 w-40">
              <Image
                src={AccountGroupIcon}
                alt="Computer Imac Smiley Face Streamline Icon"
                fill
                sizes="160px"
                className="object-contain"
              />
            </div>
            <p className="text-center leading-relaxed text-gray-700">
              {home.aboutLeague.items.teamGoal}
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative mb-4 h-40 w-40">
              <Image
                src={ComputerImacSmileyFaceIcon}
                alt="Business Idea Light Bulb Streamline Icon"
                fill
                sizes="160px"
                className="object-contain"
              />
            </div>
            <p className="text-center leading-relaxed text-gray-700">
              {home.aboutLeague.items.creativity}
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative mb-4 h-40 w-40">
              <Image
                src={BadgeStarIcon}
                alt="Globe 1 Streamline Icon"
                fill
                sizes="160px"
                className="object-contain"
              />
            </div>
            <p className="text-center leading-relaxed text-gray-700">
              {home.aboutLeague.items.international}
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button className="flex h-12 items-center justify-center gap-1.5 border border-gray-500 bg-white px-6 font-medium text-black hover:bg-gray-100">
            {home.button.learnMore}
          </button>
        </div>
      </div>

      <div className="bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 py-24 md:px-8 xl:px-20">
          <div className="mb-16 flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <p className="text-md mb-2 text-gray-500">
                {home.history.section}
              </p>
              <h2 className="text-3xl font-bold">{home.history.title}</h2>
            </div>

            <div className="flex justify-center md:flex-1 md:justify-start">
              <ol className="relative border-s border-gray-300">
                {eventData
                  .slice(-5, -1)
                  .reverse()
                  .map((event, idx, arr) => {
                    const content = eventDetailData.find(
                      (c) => c.eventId === event.id && c.locale === locale,
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
                          {formatDateRange(
                            event.dateStart,
                            event.dateEnd,
                            locale,
                          )}
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
              {home.history.viewMore}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-24 md:px-8 xl:px-20">
        <div className="mb-12 text-center">
          <p className="text-md mb-2 text-gray-500">{home.leagues.section}</p>
          <h2 className="text-3xl font-bold">{home.leagues.title}</h2>
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
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
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

                    <div className="mt-5 flex items-center gap-1">
                      <span className="font-medium text-gray-900">
                        {home.button.more}
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
            {home.button.viewLeague}
          </button>
        </div>
      </div>

      <div className="bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 py-24 md:px-8 xl:px-20">
          <div className="mb-12 text-center">
            <p className="text-md mb-2 text-gray-500">{home.events.section}</p>
            <h2 className="text-3xl font-bold">{home.events.title}</h2>
          </div>

          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {eventDetailData
              .filter(
                (eventDetail) =>
                  eventDetail.showInEvents && eventDetail.locale === locale,
              )
              .map((eventDetail) => {
                const event = eventData.find(
                  (event) => event.id === eventDetail.eventId,
                );

                return (
                  <div
                    key={eventDetail.id}
                    className="group relative h-full w-full cursor-pointer border bg-white hover:bg-gray-100"
                  >
                    <div className="relative aspect-[842/1191] w-full overflow-hidden">
                      <Image
                        src={eventDetail.posterImageUrl ?? ""}
                        alt={eventDetail.title}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
                        className="object-cover"
                      />
                    </div>

                    <div className="p-5 text-left">
                      <h3 className="line-clamp-2 text-xl font-bold text-gray-900">
                        {eventDetail.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-gray-600">
                        {eventDetail.location}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {event &&
                          formatDateRange(
                            event.dateStart,
                            event.dateEnd,
                            locale,
                          )}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="flex justify-center">
            <button className="flex h-12 items-center justify-center gap-1.5 border border-gray-500 bg-white px-6 font-medium text-black hover:bg-gray-100">
              {home.events.viewMore}
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
              sizes="100vw"
              className="object-cover object-[center_20%]"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative flex h-full w-full flex-col items-start justify-between gap-20 px-8 py-12">
            <p className="break-keep text-center text-base font-medium leading-relaxed text-white md:text-left">
              {home.sponsor.description1}
              <br />
              {home.sponsor.description2}
            </p>
            <div className="flex w-full justify-center md:justify-end">
              <button className="flex h-12 items-center justify-center gap-1.5 border border-white bg-transparent px-6 font-medium text-white hover:bg-white/10">
                {home.sponsor.cta}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
