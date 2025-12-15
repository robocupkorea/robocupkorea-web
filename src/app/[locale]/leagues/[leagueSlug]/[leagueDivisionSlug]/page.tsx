import { notFound } from "next/navigation";
import { getLocale, getMessages } from "next-intl/server";

import ProseArticle from "@/components/ProseArticle";
import { convertMarkdownToHtml } from "@/lib/markdown/markdown-to-html";
import { convertPage } from "@/lib/notion/notion-to-md";
import prisma, { Locale } from "@/lib/prisma";

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
  const locale = (await getLocale()) === "ko" ? Locale.ko : Locale.en;
  const { leagueSlug, leagueDivisionSlug } = params;

  const leagueDivision = await prisma.leagueDivision.findFirst({
    where: {
      slug: leagueDivisionSlug, // 하위 리그 slug 일치
      locale: locale, // 언어 일치
      league: {
        slug: leagueSlug, // 상위 리그 slug 일치
      },
    },
    select: {
      cmsPageId: true, // page id만 있으면 된다
    },
  });

  if (!leagueDivision || !leagueDivision.cmsPageId) {
    notFound();
  }

  const mdString = await convertPage(leagueDivision.cmsPageId);

  if (!mdString) {
    notFound();
  }

  const htmlContent = await convertMarkdownToHtml(mdString);

  return (
    <section className="container mx-auto max-w-3xl px-4 py-8 md:px-8 xl:px-20">
      <ProseArticle id="league-division-content" htmlContent={htmlContent} />
    </section>
  );
}
