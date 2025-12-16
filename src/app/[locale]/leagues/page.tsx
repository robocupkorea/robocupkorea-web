import { ArrowDownIcon } from "@phosphor-icons/react/dist/ssr";
import { getLocale, getMessages } from "next-intl/server";

import ScrollableLeagueSection from "@/components/ScrollableLeagueSection";
import { Link } from "@/i18n/navigation";
import prisma, { Locale } from "@/lib/prisma";

export async function generateMetadata() {
  const { leagues } = await getMessages();

  return {
    title: leagues.meta.title,
    description: leagues.meta.description,
  };
}

export default async function LeaguesPage() {
  const locale = (await getLocale()) === "ko" ? Locale.ko : Locale.en;
  const { leagues } = await getMessages();

  // 리그별로 그룹화
  const leaguesData = await prisma.league.findMany({
    orderBy: { id: "asc" },
    include: {
      divisions: {
        where: { locale: locale },
        orderBy: { id: "asc" },
      },
    },
  });

  return (
    <>
      <header className="bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
          <div className="text-center">
            <h1 className="break-keep text-4xl font-bold text-gray-900">
              {leagues.title}
            </h1>
            <p className="mt-4 break-keep text-lg text-gray-800">
              {leagues.subtitle}
            </p>
          </div>
        </div>
      </header>

      <section className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
        <div className="mb-16 text-center">
          <h2
            id="overview-heading"
            className="break-keep text-3xl font-bold text-gray-900"
          >
            {leagues.overview.title}
          </h2>
          <p className="mt-4 break-keep text-lg text-gray-700">
            {leagues.overview.description}
          </p>
        </div>

        {/* 리그 목록 */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {leaguesData.map((league) => {
            const divisions = league.divisions;

            return (
              <article
                key={league.id}
                className="border border-gray-200 bg-white p-2 sm:p-3 md:p-4"
              >
                <div className="mb-1 flex">
                  <Link
                    href={`#${league.slug}`}
                    className="flex cursor-pointer items-center text-gray-800 hover:text-blue-600"
                  >
                    <ArrowDownIcon
                      className="h-3 w-3 md:h-4 md:w-4"
                      weight="bold"
                    />
                    <h3 className="text-sm font-semibold tracking-tighter sm:text-base md:text-lg">
                      {league.name}
                    </h3>
                  </Link>
                </div>
                <ul className="flex flex-col gap-2 md:gap-3">
                  {divisions.map((division) => (
                    <li key={division.id} className="flex">
                      <Link
                        href={`/leagues/${league.slug}/${division.slug}`}
                        className="pl-0.5 md:pl-1"
                      >
                        <span className="block text-xs text-gray-500 underline underline-offset-2 hover:text-blue-600 sm:text-sm">
                          {division.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="container mx-auto max-w-7xl py-16">
        <div id="detailed-leagues" className="space-y-16">
          {leaguesData.map((league) => (
            <div id={league.slug} key={league.id} className="scroll-mt-20">
              <ScrollableLeagueSection
                league={league}
                divisions={league.divisions}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
