"use client";

import Image from "next/image";

import { eventContentData } from "@/data/eventContentData";
import { eventData } from "@/data/eventData";
import { formatDateRange } from "@/utils/date";

export default function EventPage() {
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

      <div className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {eventContentData
            .filter((eventContent) => eventContent.showInEventPage)
            .map((eventContent) => {
              const event = eventData.find(
                (event) => event.id === eventContent.eventId,
              );

              return (
                <div
                  key={eventContent.id}
                  className="group relative h-full w-full cursor-pointer border bg-white hover:bg-gray-100"
                >
                  <div className="relative aspect-[842/1191] w-full overflow-hidden">
                    <Image
                      src={eventContent.poster_image_url ?? ""}
                      alt={eventContent.title}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="p-5 text-left">
                    <h3 className="line-clamp-2 text-xl font-bold text-gray-900">
                      {eventContent.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-gray-600">
                      {eventContent.location}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {event && formatDateRange(event.dateStart, event.dateEnd)}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
