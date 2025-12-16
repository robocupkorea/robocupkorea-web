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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {leaguesData.map((league) => {
            const divisions = league.divisions;

            return (
              <article
                key={league.id}
                className="border border-gray-200 bg-white p-4"
              >
                <Link
                  href={`#${league.slug}`}
                  className="flex cursor-pointer items-center gap-1 text-gray-800 hover:text-blue-600"
                >
                  <ArrowDownIcon className="h-4 w-4" weight="bold" />
                  <h3 className="text-lg font-bold">{league.name}</h3>
                </Link>
                <ul className="space-y-0.5">
                  {divisions.map((division) => (
                    <li key={division.id} className="flex">
                      <Link
                        href={`/leagues/${league.slug}/${division.slug}`}
                        className="block rounded-md p-1"
                      >
                        <span className="text-sm text-gray-600 underline underline-offset-2 hover:text-blue-600">
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
