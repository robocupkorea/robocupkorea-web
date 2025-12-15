import { getLocale } from "next-intl/server";

import { Event, EventDetail, Locale } from "@/lib/prisma";
import { formatDateRange } from "@/utils/date";

interface TimelineItemProps {
  event: Event & { details: EventDetail[] };
  events: (Event & { details: EventDetail[] })[];
  eventIndex: number;
}

export default async function TimelineItem({
  event,
  events,
  eventIndex,
}: TimelineItemProps) {
  const locale = (await getLocale()) === "ko" ? Locale.ko : Locale.en;
  const content = event.details.find((detail) => detail.locale === locale);
  const showYear =
    eventIndex === 0 || events[eventIndex - 1].year !== event.year;

  return (
    <li className="mb-12 ml-4 w-full md:w-auto">
      {showYear && (
        <>
          <div className="absolute -start-2 mt-1 h-4 w-4 rounded-full border border-gray-800 bg-gray-800" />
          <div className="mb-4">
            <h3 className="break-keep text-2xl font-bold leading-none tracking-tight text-gray-800">
              {event.year}
            </h3>
          </div>
        </>
      )}

      <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-gray-300 bg-gray-300" />
      <time
        className="break-keep text-sm font-medium text-gray-600"
        dateTime={event.dateStart.toISOString()}
      >
        {formatDateRange(
          event.dateStart.toISOString(),
          event.dateEnd.toISOString(),
          locale,
        )}
      </time>
      <h3 className="mt-1 break-keep text-lg font-bold text-gray-800">
        {content?.title}
      </h3>
      {content?.location && (
        <address className="mb-6 not-italic text-gray-500">
          {content?.location}
        </address>
      )}
    </li>
  );
}
