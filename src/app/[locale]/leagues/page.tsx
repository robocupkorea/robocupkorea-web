import { getMessages } from "next-intl/server";

import ScrollableLeagueSection from "@/components/ScrollableLeagueSection";
import { leagueData } from "@/data/leagueData";
import { leagueDivisionData } from "@/data/leagueDivisionData";
import { Link } from "@/i18n/navigation";

export default async function LeaguesPage() {
  const { leagues } = await getMessages();

  // 리그별로 그룹화
  const groupedLeagues = leagueData.map((league) => {
    const divisions = leagueDivisionData.filter(
      (division) => division.leagueId === league.id,
    );
    return {
      league,
      divisions,
    };
  });

  return (
    <>
      <div className="bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">
              {leagues.title}
            </h1>
            <p className="mt-4 break-keep text-lg text-gray-800">
              {leagues.subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            {leagues.overview.title}
          </h2>
          <p className="mt-4 break-keep text-lg text-gray-700">
            {leagues.overview.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {leagueData.map((league) => {
            const divisions = leagueDivisionData.filter(
              (division) => division.leagueId === league.id,
            );

            return (
              <div
                key={league.id}
                className="border border-gray-200 bg-white p-4"
              >
                <Link href={`#${league.slug}`} className="cursor-pointer">
                  <h3 className="mb-3 text-lg font-bold text-gray-800 underline underline-offset-2 hover:text-blue-600">
                    {league.name}
                  </h3>
                </Link>
                <ul className="space-y-1">
                  {divisions.map((division) => (
                    <li key={division.id} className="flex">
                      <Link
                        href={`/leagues/${league.slug}/${division.slug}`}
                        className="block rounded-md p-1"
                      >
                        <span className="text-sm text-gray-600 hover:text-blue-600">
                          {division.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
        <div className="space-y-16">
          {groupedLeagues.map(({ league, divisions }) => (
            <div id={league.slug} key={league.id} className="scroll-mt-20">
              <ScrollableLeagueSection league={league} divisions={divisions} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
