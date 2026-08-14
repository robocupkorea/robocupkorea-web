import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";

import NotionViewer from "@/components/NotionViewer";
import PageContainer from "@/components/PageContainer";
import { getPageBlocks } from "@/lib/notion/notion-to-page";

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
