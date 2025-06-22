import { notFound } from "next/navigation";

import { leagueData } from "@/data/leagueData";
import { convertMarkdownToHtml } from "@/lib/markdown/markdown-to-html";
import { getLeagueDivisionPage } from "@/lib/notion/leagues";
import { convertPage } from "@/lib/notion/notion-to-md";

export default async function LeagueDivisionPage({
  params,
}: {
  params: { leagueSlug: string; leagueDivisionSlug: string };
}) {
  const { leagueSlug, leagueDivisionSlug } = params;

  const league = leagueData.find((league) => league.slug === leagueSlug);

  if (!league) {
    notFound();
  }

  const page = await getLeagueDivisionPage(league.id, leagueDivisionSlug);

  if (!page) {
    notFound(); // 발행되지 않은 공지사항 페이지
  }

  const mdString = await convertPage(page.leagueDivision.id);

  return (
    <>
      <div className="bg-gray-50">
        <div className="container mx-auto max-w-3xl px-4 py-8 md:px-8 xl:px-20">
          <div className="text-left">
            <h1 className="text-3xl font-bold text-gray-900">
              {page.leagueDivision.name}
            </h1>
          </div>
        </div>
      </div>
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
