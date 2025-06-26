"use client";

import { CalendarIcon, MapPinIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useLocale } from "next-intl";

import EventStatus from "@/components/EventStatus";
import { Link } from "@/i18n/navigation";
import { Event, EventDetail } from "@/types/events";
import { formatDateRange, getEventStatus } from "@/utils/date";

interface EventCardProps {
  eventDetail: EventDetail;
  event: Event;
}

export default function EventCard({ eventDetail, event }: EventCardProps) {
  const locale = useLocale();

  return (
    <article className="group relative h-full w-full cursor-pointer border bg-white hover:bg-gray-100">
      <Link href={`/events/${eventDetail.cmsPageId}`} className="block h-full">
        <div className="relative aspect-[842/1191] w-full overflow-hidden">
          <Image
            src={eventDetail.posterImageUrl ?? ""}
            alt={eventDetail.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-grow flex-col gap-2 px-5 py-4 text-left">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3
                id={`event-${eventDetail.cmsPageId}-title`}
                className="line-clamp-2 text-lg font-semibold text-gray-900"
              >
                {eventDetail.title}
              </h3>
            </div>
            <EventStatus
              status={getEventStatus(event.dateStart, event.dateEnd)}
            />
          </div>

          <div className="flex flex-col gap-1 text-sm text-gray-700">
            <div className="flex items-center gap-1.5">
              <MapPinIcon size={16} />
              <span>{eventDetail.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CalendarIcon size={16} />
              <span>
                {formatDateRange(event.dateStart, event.dateEnd, locale)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
