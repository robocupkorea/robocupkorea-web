import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";

import NotionViewer from "@/components/NotionViewer";
import PageContainer from "@/components/PageContainer";
import { getNoticePage } from "@/lib/notion/notices";
import { getPageBlocks } from "@/lib/notion/notion-to-page";

export async function generateMetadata() {
  const { notices } = await getMessages();

  return {
    title: notices.meta.title,
    description: notices.meta.description,
  };
}

export default async function NoticeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const page = await getNoticePage(id);

  if (!page) {
    notFound(); // 발행되지 않은 공지사항 페이지
  }

  const blocks = await getPageBlocks(id);

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
