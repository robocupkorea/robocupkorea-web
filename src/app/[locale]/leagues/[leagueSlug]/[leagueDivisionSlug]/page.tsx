import { notFound } from "next/navigation";
import { getLocale, getMessages } from "next-intl/server";

import { leagueData } from "@/data/league-data";
import { leagueDivisionData } from "@/data/league-division-data";
import { convertMarkdownToHtml } from "@/lib/markdown/markdown-to-html";
import { convertPage } from "@/lib/notion/notion-to-md";

export async function generateMetadata() {
  const { leagues } = await getMessages();

  return {
    title: leagues.meta.title,
    description: leagues.meta.description,
  };
}

export default async function LeagueDivisionPage({
  params,
}: {
  params: { leagueSlug: string; leagueDivisionSlug: string };
}) {
  const locale = await getLocale();
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
      leagueDivision.slug === leagueDivisionSlug &&
      leagueDivision.locale === locale,
  );

  if (!leagueDivision) {
    notFound();
  }

  const mdString = await convertPage(leagueDivision.cmsPageId);

  if (!mdString) {
    notFound();
  }

  const htmlContent = await convertMarkdownToHtml(mdString);

  return (
    <section className="container mx-auto max-w-3xl px-4 py-8 md:px-8 xl:px-20">
      <article
        id="league-division-content"
        className="prose leading-tight"
        dangerouslySetInnerHTML={{
          __html: htmlContent,
        }}
      />
    </section>
  );
}
