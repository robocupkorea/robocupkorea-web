import { getLocale, getMessages } from "next-intl/server";

import PageContainer from "@/components/PageContainer";
import TimelineItem from "@/components/TimelineItem";
import prisma, { Locale } from "@/lib/prisma";

export async function generateMetadata() {
  const { history } = await getMessages();

  return {
    title: history.meta.title,
    description: history.meta.description,
  };
}

export default async function HistoryPage() {
  const locale = (await getLocale()) === "ko" ? Locale.ko : Locale.en;
  const { history } = await getMessages();

  const events = await prisma.event.findMany({
    include: { details: { where: { locale: locale } } },
    orderBy: { dateStart: "desc" },
  });

  return (
    <PageContainer>
      <header className="bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
          <div className="text-center">
            <h1 className="break-keep text-4xl font-bold text-gray-900">
              {history.title}
            </h1>
            <p className="mt-4 break-keep text-lg text-gray-800">
              {history.subtitle}
            </p>
          </div>
        </div>
      </header>

      <section className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
        <div className="mb-12 text-center">
          <p className="text-md mb-2 break-keep text-gray-500">
            {history.timeline.section}
          </p>
          <h2 id="timeline-heading" className="break-keep text-3xl font-bold">
            {history.timeline.title}
          </h2>
        </div>

        <div className="flex justify-center">
          <ol className="relative border-s border-gray-300">
            {events.map((event, idx) => {
              return (
                <TimelineItem
                  key={event.id}
                  event={event}
                  events={events}
                  eventIndex={idx}
                />
              );
            })}
          </ol>
        </div>
      </section>
    </PageContainer>
  );
}
