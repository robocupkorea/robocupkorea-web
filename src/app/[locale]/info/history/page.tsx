import { getLocale, getMessages } from "next-intl/server";

import { eventData } from "@/data/event-data";
import { eventDetailData } from "@/data/event-detail-data";
import { formatDateRange } from "@/utils/date";

export default async function HistoryPage() {
  const locale = await getLocale();

  const { history } = await getMessages();

  return (
    <>
      <div className="bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">
              {history.title}
            </h1>
            <p className="mt-4 text-lg text-gray-800">{history.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
        <div className="mb-12 text-center">
          <p className="text-md mb-2 text-gray-500">
            {history.timeline.section}
          </p>
          <h2 className="text-3xl font-bold">{history.timeline.title}</h2>
        </div>

        <div className="flex justify-center">
          <ol className="relative border-s border-gray-300">
            {eventData
              .slice()
              .reverse()
              .map((event, idx, arr) => {
                const content = eventDetailData.find(
                  (c) => c.eventId === event.id && c.locale === locale,
                );
                const showYear = idx === 0 || arr[idx - 1].year !== event.year;

                return (
                  <li key={event.id} className="mb-10 ml-4 w-full md:w-auto">
                    {showYear && (
                      <>
                        <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-gray-700 bg-gray-700" />
                        <div className="mb-4">
                          <h3 className="text-2xl font-bold leading-none text-gray-700">
                            {event.year}
                          </h3>
                        </div>
                      </>
                    )}

                    <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-gray-300 bg-gray-300" />
                    <time className="text-sm text-gray-500">
                      {formatDateRange(event.dateStart, event.dateEnd, locale)}
                    </time>
                    <h3 className="mt-0.5 text-xl font-semibold">
                      {content?.title}
                    </h3>
                    <p className="mb-6 text-gray-500">{content?.location}</p>
                  </li>
                );
              })}
          </ol>
        </div>
      </div>
    </>
  );
}
