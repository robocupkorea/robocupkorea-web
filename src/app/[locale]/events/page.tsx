import { getLocale, getMessages } from "next-intl/server";

import EventCard from "@/components/EventCard";
import { eventData } from "@/data/eventData";
import { eventDetailData } from "@/data/eventDetailData";

export default async function EventPage() {
  const locale = await getLocale();

  const { events } = await getMessages();

  // showInEvents가 true이고 현재 locale과 일치하는 이벤트만 필터링
  const filteredEventDetails = eventDetailData.filter(
    (eventDetail) => eventDetail.showInEvents && eventDetail.locale === locale,
  );

  // eventDetails와 eventData를 Join하고 dateStart 기준으로 내림차순 정렬
  const eventWithDetails = filteredEventDetails
    .map((eventDetail) => {
      const event = eventData.find((event) => event.id === eventDetail.eventId);
      return event ? { eventDetail, event } : null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)
    .sort(
      (a, b) =>
        new Date(b.event.dateStart).getTime() -
        new Date(a.event.dateStart).getTime(),
    );

  return (
    <>
      <div className="bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">{events.title}</h1>
            <p className="mt-4 text-lg text-gray-800">{events.subtitle}</p>
          </div>
        </div>
      </div>

      {eventWithDetails.length === 0 && (
        <div className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
          <p className="text-center text-gray-500">{events.noEvents}</p>
        </div>
      )}

      <div className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
        <div className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {eventWithDetails.map(({ eventDetail, event }) => (
            <EventCard
              key={eventDetail.id}
              eventDetail={eventDetail}
              event={event}
            />
          ))}
        </div>
      </div>
    </>
  );
}
