import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";

import { convertMarkdownToHtml } from "@/lib/markdown/markdown-to-html";
import { convertPage } from "@/lib/notion/notion-to-md";

export async function generateMetadata() {
  const { events } = await getMessages();

  return {
    title: events.meta.title,
    description: events.meta.description,
  };
}

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
      <section className="container mx-auto max-w-3xl px-4 py-8 md:px-8 xl:px-20">
        <article
          id="event-content"
          className="prose leading-tight"
          dangerouslySetInnerHTML={{
            __html: await convertMarkdownToHtml(mdString),
          }}
        />
      </section>
    </>
  );
}
