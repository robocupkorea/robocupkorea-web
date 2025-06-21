import { notFound } from "next/navigation";

import { convertMarkdownToHtml } from "@/lib/markdown/markdown-to-html";
import { getNoticePage } from "@/lib/notion/notices";
import { convertPage } from "@/lib/notion/notion-to-md";
import { formatISODate } from "@/utils/date";

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
      <div className="bg-gray-50">
        <div className="container mx-auto max-w-3xl px-4 py-8 md:px-8 xl:px-20">
          <div className="text-left">
            <h1 className="text-3xl font-bold text-gray-900">
              {page.notice.title}
            </h1>
            <p className="mt-4 text-sm text-gray-800">
              작성일: {formatISODate(page.notice.createdAt)}
            </p>
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
