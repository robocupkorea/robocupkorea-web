import { notFound } from "next/navigation";

import { leagueData } from "@/data/leagueData";
import { leagueDivisionData } from "@/data/leagueDivisionData";
import { convertMarkdownToHtml } from "@/lib/markdown/markdown-to-html";
import { convertPage } from "@/lib/notion/notion-to-md";

export default async function LeagueDivisionPage({
  params,
}: {
  params: { leagueSlug: string; leagueDivisionSlug: string };
}) {
  const { leagueSlug, leagueDivisionSlug } = params;

  // 리그 찾기
  const league = leagueData.find((league) => league.slug === leagueSlug);

  if (!league) {
    notFound();
  }

  // 리그 부문 찾기
  const leagueDivision = leagueDivisionData.find(
    (leagueDivision) =>
      leagueDivision.leagueId === league.id &&
      leagueDivision.slug === leagueDivisionSlug,
  );

  if (!leagueDivision) {
    notFound();
  }

  const mdString = await convertPage(leagueDivision.cmsPageId);

  if (!mdString) {
    notFound();
  }

  return (
    <>
      <div className="container mx-auto max-w-3xl px-4 py-8 md:px-8 xl:px-20">
        <div
          className="prose space-y-5"
          dangerouslySetInnerHTML={{
            __html: await convertMarkdownToHtml(mdString),
          }}
        />
      </div>
    </>
  );
}
