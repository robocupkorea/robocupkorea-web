import { notFound } from "next/navigation";

import { convertMarkdownToHtml } from "@/lib/markdown/markdown-to-html";
import { convertPage } from "@/lib/notion/notion-to-md";

export default async function EventPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const mdString = await convertPage(id);

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
