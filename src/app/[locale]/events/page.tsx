import { getLocale, getMessages } from "next-intl/server";

import EventCard from "@/components/EventCard";
import prisma, { Locale } from "@/lib/prisma";

export async function generateMetadata() {
  const { events } = await getMessages();

  return {
    title: events.meta.title,
    description: events.meta.description,
  };
}

export default async function EventPage() {
  const locale = (await getLocale()) === "ko" ? Locale.ko : Locale.en;
  const { events } = await getMessages();

  const eventDetails = await prisma.eventDetail.findMany({
    where: { showInEvents: true, locale: locale },
    include: { event: true },
    orderBy: { event: { dateStart: "desc" } },
  });

  return (
    <>
      <header className="bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
          <div className="text-center">
            <h1 className="break-keep text-4xl font-bold text-gray-900">
              {events.title}
            </h1>
            <p className="mt-4 break-keep text-lg text-gray-800">
              {events.subtitle}
            </p>
          </div>
        </div>
      </header>

      {eventDetails.length === 0 ? (
        <section className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
          <p className="break-keep text-center text-gray-500">
            {events.noEvents}
          </p>
        </section>
      ) : null}

      <section className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
        <div
          id="events-list"
          className="mb-12 grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 md:px-8 lg:grid-cols-3 xl:px-20"
        >
          {eventDetails.map((eventDetail) => (
            <li key={eventDetail.id} className="w-full list-none">
              <EventCard eventDetail={eventDetail} event={eventDetail.event} />
            </li>
          ))}
        </div>
      </section>
    </>
  );
}
