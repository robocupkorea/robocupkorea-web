import EventCard from "@/components/EventCard";
import { eventData } from "@/data/eventData";
import { getEventDetails } from "@/lib/notion/events";

export default async function EventPage() {
  const eventDetails = await getEventDetails();

  // eventDetails와 eventData를 Join하고 dateStart 기준으로 내림차순 정렬
  const eventWithDetails = eventDetails
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
            <h1 className="text-4xl font-bold text-gray-900">로보컵 대회</h1>
            <p className="mt-4 text-lg text-gray-800">
              매년 개최되는 다양한 대회에 도전해보세요
            </p>
          </div>
        </div>
      </div>

      {eventWithDetails.length === 0 && (
        <div className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
          <p className="text-center text-gray-500">대회가 없습니다.</p>
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
