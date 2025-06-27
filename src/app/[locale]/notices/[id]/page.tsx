import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";

import { convertMarkdownToHtml } from "@/lib/markdown/markdown-to-html";
import { getNoticePage } from "@/lib/notion/notices";
import { convertPage } from "@/lib/notion/notion-to-md";

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

  const mdString = await convertPage(id);

  return (
    <>
      <section className="container mx-auto max-w-3xl px-4 py-8 md:px-8 xl:px-20">
        <article
          id="notice-content"
          className="prose leading-tight"
          dangerouslySetInnerHTML={{
            __html: await convertMarkdownToHtml(mdString),
          }}
        />
      </section>
    </>
  );
}
