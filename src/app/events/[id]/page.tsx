import { notFound } from "next/navigation";

import { eventData } from "@/data/eventData";
import { convertMarkdownToHtml } from "@/lib/markdown/markdown-to-html";
import { getEventDetailPage } from "@/lib/notion/events";
import { convertPage } from "@/lib/notion/notion-to-md";

export default async function EventPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const page = await getEventDetailPage(id);

  if (!page) {
    notFound();
  }

  // eventData에서 해당 이벤트 찾기
  const event = eventData.find(
    (event) => event.id === page.eventDetail.eventId,
  );

  if (!event) {
    notFound();
  }

  const mdString = await convertPage(id);

  return (
    <>
      <div className="bg-gray-50">
        <div className="container mx-auto max-w-3xl px-4 py-8 md:px-8 xl:px-20">
          <div className="text-left">
            <h1 className="text-3xl font-bold text-gray-900">
              {page.eventDetail.title}
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
