import { notFound } from "next/navigation";
import { getLocale, getMessages } from "next-intl/server";

import NotionViewer from "@/components/NotionViewer";
import PageContainer from "@/components/PageContainer";
import { getPageBlocks } from "@/lib/notion/notion-to-page";
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

  const blocks = await getPageBlocks(leagueDivision.cmsPageId);

  if (!blocks) {
    notFound();
  }

  return (
    <PageContainer>
      <section className="container mx-auto max-w-7xl px-4 py-4 md:px-8 xl:px-20">
        <NotionViewer blocks={blocks} />
      </section>
    </PageContainer>
  );
}
