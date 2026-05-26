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
import accountGroupIcon from "@/assets/svg/account-group-streamline-icon.svg";
import computerImacSmileyFaceIcon from "@/assets/svg/computer-imac-smiley-face-streamline-icon.svg";
import trophyIcon from "@/assets/svg/trophy-streamline-icon.svg";
import EventCard from "@/components/EventCard";
import ImportantDates from "@/components/ImportantDates";
import LeagueCard from "@/components/LeagueCard";
import PageContainer from "@/components/PageContainer";
import TimelineItem from "@/components/TimelineItem";
import VideoPlayer from "@/components/VideoPlayer";
import { Link } from "@/i18n/navigation";
import prisma, { Locale } from "@/lib/prisma";
import { formatHomeMainEventDateRange } from "@/utils/date";

export default async function Home() {
  const locale = (await getLocale()) === "ko" ? Locale.ko : Locale.en;

  const { home } = await getMessages();

  const mainEvent = await prisma.eventDetail.findFirst({
    where: { showInMain: true, locale: locale },
    include: { event: true },
  });

  const leagueDivisions = await prisma.leagueDivision.findMany({
    where: { locale: locale }, // 잘못된 locale은 url path에서 error로 처리됨
    include: { league: true },
    take: 3,
  });

  const events = await prisma.event.findMany({
    include: { details: { where: { locale: locale } } },
    orderBy: { dateStart: "desc" },
    take: 4,
  });

  const eventDetails = await prisma.eventDetail.findMany({
    where: { showInEvents: true, locale },
    include: { event: true },
    orderBy: { event: { dateStart: "desc" } },
    take: 6,
  });

  const importantDate = mainEvent?.event.registrationStart
    ? {
        title: locale === Locale.ko ? "등록기간" : "Registration period",
        dateStart: mainEvent.event.registrationStart,
        dateEnd:
          mainEvent.event.registrationEnd ?? mainEvent.event.registrationStart,
      }
    : null;

  return (
    <PageContainer>
      {/* 메인 이벤트 및 랜딩 비디오 */}
      <section className="relative h-[calc(100svh-64px)] max-h-[1000px] w-full bg-black md:h-[calc(100svh-80px)]">
        <VideoPlayer
          src="https://media.robocupkorea.org/videos/landing/intro.m3u8"
          previewSrc="https://media.robocupkorea.org/images/landing/preview.png"
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
          fallbackMobile
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/15 to-black/50" />
        <header className="absolute inset-x-0 top-8">
          <div className="container mx-auto flex max-w-7xl flex-col px-4 text-white md:px-8 xl:px-20">
            {mainEvent ? (
              <>
                <p className="mb-1.5">{home.intro.association}</p>
                <h1 className="mb-4 break-keep text-[2.5rem] font-black leading-tight sm:text-5xl lg:mb-5 lg:text-6xl">
                  {mainEvent.title}
                </h1>
                <div className="mb-1 flex flex-col gap-1 md:text-lg">
                  <div className="flex items-center gap-1">
                    <CalendarIcon size={24} weight="fill" />
                    <time
                      className="font-medium"
                      dateTime={mainEvent.event?.dateStart?.toISOString()}
                    >
                      {mainEvent.event &&
                        formatHomeMainEventDateRange(
                          mainEvent.event.dateStart?.toISOString() || "",
                          mainEvent.event.dateEnd?.toISOString() || "",
                          locale,
                        )}
                    </time>
                  </div>
                </div>
              </>
            ) : (
              <h1 className="mb-3 break-keep text-[2.5rem] font-black leading-tight sm:text-5xl lg:mb-5 lg:text-6xl">
                {home.title}
              </h1>
            )}
            {mainEvent?.location && (
              <div className="mb-4 flex items-center gap-1 text-white/90">
                <MapPinIcon size={24} weight="fill" />
                <address className="font-medium not-italic">
                  {mainEvent.location}
                </address>
              </div>
            )}
            {importantDate && (
              <ImportantDates locale={locale} item={importantDate} />
            )}
            {mainEvent && (
              <Link
                href={
                  mainEvent.cmsPageId ? `/events/${mainEvent.cmsPageId}` : "#"
                }
                prefetch
                className="mt-4 flex h-12 w-full items-center justify-center gap-1.5 border border-gray-500 bg-white px-8 font-medium text-black hover:bg-gray-100 sm:w-fit"
              >
                {home.button.learnMore}
                <ArrowRightIcon size={24} weight="thin" />
              </Link>
            )}
          </div>
        </header>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="duration-600 flex animate-bounce items-center justify-center rounded-full bg-white p-1 text-black">
            <CaretDownIcon weight="light" className="h-8 w-8" />
          </div>
        </div>
      </section>

      {/* 협회 소개 */}
      <section className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <header className="flex-1">
            <p className="text-md mb-2 text-gray-500">{home.intro.section}</p>
            <h2 className="break-keep text-4xl font-bold">
              {home.intro.association}
            </h2>
          </header>

          <div className="flex-1">
            <p className="mb-6 break-keep leading-relaxed text-gray-800">
              {home.intro.description}
            </p>
            <Link
              href="/info/about"
              className="flex h-12 w-fit items-center justify-center gap-1.5 border border-gray-500 bg-white px-6 font-medium text-black hover:bg-gray-100"
            >
              {home.button.learnMore}
            </Link>
          </div>
        </div>
      </section>

      {/* 주요 통계 */}
      <section className="bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 py-24 md:px-8 xl:px-20">
          <header className="mb-12 text-center">
            <p className="text-md mb-2 text-gray-500">{home.stats.section}</p>
            <h2 id="stats-heading" className="break-keep text-3xl font-bold">
              {home.stats.title}
            </h2>
          </header>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
            <article className="flex flex-col items-center border bg-white p-6 md:p-8">
              <UsersIcon size={48} weight="thin" />
              <p className="mt-4 text-3xl font-bold">
                {home.stats.participants.value}
              </p>
              <p className="mt-2 break-keep text-center text-gray-600">
                {home.stats.participants.label}
              </p>
            </article>
            <article className="flex flex-col items-center border bg-white p-6 md:p-8">
              <TrophyIcon size={48} weight="thin" />
              <p className="mt-4 text-3xl font-bold">
                {home.stats.events.value}
              </p>
              <p className="mt-2 break-keep text-center text-gray-600">
                {home.stats.events.label}
              </p>
            </article>
            <article className="flex flex-col items-center border bg-white p-6 md:p-8">
              <BuildingOfficeIcon size={48} weight="thin" />
              <p className="mt-4 text-3xl font-bold">
                {home.stats.sponsors.value}
              </p>
              <p className="mt-2 break-keep text-center text-gray-600">
                {home.stats.sponsors.label}
              </p>
            </article>
            <article className="flex flex-col items-center border bg-white p-6 md:p-8">
              <GraduationCapIcon size={48} weight="thin" />
              <p className="mt-4 text-3xl font-bold">
                {home.stats.schools.value}
              </p>
              <p className="mt-2 break-keep text-center text-gray-600">
                {home.stats.schools.label}
              </p>
            </article>
          </div>
          <footer>
            <p className="mt-8 text-center text-xs text-gray-500">
              {home.stats.note}
            </p>
          </footer>
        </div>
      </section>

      {/* 한국 로보컵 소개 */}
      <section className="container mx-auto max-w-7xl px-4 py-24 md:px-8 xl:px-20">
        <header className="mb-12 text-center">
          <p className="text-md mb-2 text-gray-500">
            {home.aboutLeague.section}
          </p>
          <h2
            id="about-league-heading"
            className="break-keep text-3xl font-bold"
          >
            {home.aboutLeague.title}
          </h2>
        </header>
        <div className="mb-12 text-center">
          <p className="mx-auto max-w-2xl break-keep leading-relaxed text-gray-700">
            {home.aboutLeague.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-14 md:grid-cols-3 md:gap-10">
          <article className="flex flex-col items-center">
            <div className="relative mb-6 h-40 w-40">
              <Image
                src={accountGroupIcon}
                alt="Account Group Streamline Icon"
                fill
                sizes="160px"
                className="object-contain"
              />
            </div>
            <p className="break-keep text-center leading-relaxed text-gray-700">
              {home.aboutLeague.items.teamGoal}
            </p>
          </article>

          <article className="flex flex-col items-center">
            <div className="relative mb-6 h-40 w-40">
              <Image
                src={computerImacSmileyFaceIcon}
                alt="Computer Imac Smiley Face Streamline Icon"
                fill
                sizes="160px"
                className="object-contain"
              />
            </div>
            <p className="break-keep text-center leading-relaxed text-gray-700">
              {home.aboutLeague.items.creativity}
            </p>
          </article>

          <article className="flex flex-col items-center">
            <div className="relative mb-6 h-40 w-40">
              <Image
                src={trophyIcon}
                alt="Trophy Streamline Icon"
                fill
                sizes="160px"
                className="object-contain"
              />
            </div>
            <p className="break-keep text-center leading-relaxed text-gray-700">
              {home.aboutLeague.items.international}
            </p>
          </article>
        </div>
      </section>

      {/* 연혁 */}
      <section className="bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 py-24 md:px-8 xl:px-20">
          <div className="mb-16 flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
            <header className="flex-1">
              <p className="text-md mb-2 text-gray-500">
                {home.history.section}
              </p>
              <h2 id="history-heading" className="text-3xl font-bold">
                {home.history.title}
              </h2>
            </header>

            <div className="flex justify-center md:flex-1 md:justify-start">
              <ol className="relative border-s border-gray-300">
                {events.map((event, idx, arr) => (
                  <TimelineItem
                    key={event.id}
                    event={event}
                    events={arr}
                    eventIndex={idx}
                  />
                ))}
              </ol>
            </div>
          </div>

          <footer className="flex justify-center">
            <Link
              href="/info/history"
              className="flex h-12 items-center justify-center gap-1.5 border border-gray-500 bg-white px-6 font-medium text-black hover:bg-gray-100"
            >
              {home.history.viewMore}
            </Link>
          </footer>
        </div>
      </section>

      {/* 한국 로보컵 리그 */}
      <section className="container mx-auto max-w-7xl px-4 py-24 md:px-8 xl:px-20">
        <header className="mb-12 text-center">
          <p className="text-md mb-2 text-gray-500">{home.leagues.section}</p>
          <h2 id="leagues-heading" className="break-keep text-3xl font-bold">
            {home.leagues.title}
          </h2>
        </header>

        <div className="mb-12 grid grid-cols-1 gap-10 max-md:mx-auto max-md:max-w-md md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {leagueDivisions.map((division) => {
            return (
              <article key={division.id}>
                <LeagueCard
                  league={division.league}
                  leagueDivision={division}
                  fullWidth
                />
              </article>
            );
          })}
        </div>

        <footer className="flex justify-center">
          <Link
            href="/leagues"
            className="flex h-12 items-center justify-center gap-1.5 border border-gray-500 bg-white px-6 font-medium text-black hover:bg-gray-100"
          >
            {home.button.viewLeague}
          </Link>
        </footer>
      </section>

      {/* 한국 로보컵 대회 */}
      <section className="bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 py-24 md:px-8 xl:px-20">
          <header className="mb-12 text-center">
            <p className="text-md mb-2 text-gray-500">{home.events.section}</p>
            <h2 id="events-heading" className="text-3xl font-bold">
              {home.events.title}
            </h2>
          </header>

          <div className="mb-12 grid grid-cols-1 gap-10 max-md:mx-auto max-md:max-w-md md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {eventDetails.map((eventDetail) => (
              <article key={eventDetail.id}>
                <EventCard
                  eventDetail={eventDetail}
                  event={eventDetail.event}
                />
              </article>
            ))}
          </div>

          <footer className="flex justify-center">
            <Link
              href="/events"
              className="flex h-12 items-center justify-center gap-1.5 border border-gray-500 bg-white px-6 font-medium text-black hover:bg-gray-100"
            >
              {home.events.viewMore}
            </Link>
          </footer>
        </div>
      </section>

      {/* 후원 */}
      <section className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
        <div className="relative min-h-72">
          <div className="absolute inset-0">
            <Image
              src={sponsorBanner}
              alt="Sponsor Banner"
              fill
              sizes="100vw"
              className="object-cover object-[center_20%]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>
          <div className="relative flex h-full w-full flex-col items-start justify-between gap-20 px-8 py-12">
            <p className="break-keep text-center text-base font-medium leading-relaxed text-white md:text-left">
              {home.sponsor.description1}
              <br />
              {home.sponsor.description2}
            </p>
            <footer className="flex w-full justify-center md:justify-end">
              <Link
                href="/info/sponsors"
                className="flex h-12 items-center justify-center gap-1.5 border border-white bg-transparent px-10 font-semibold text-white hover:bg-white/20"
              >
                {home.sponsor.cta}
              </Link>
            </footer>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
