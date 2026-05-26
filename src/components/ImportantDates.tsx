import { Locale } from "@/lib/prisma";
import { formatDateRange, formatKoreanDateRange } from "@/utils/date";

type ImportantDateItem = {
  title: string;
  dateStart: string | Date;
  dateEnd: string | Date;
};

type ImportantDatesProps = {
  locale: Locale;
  item: ImportantDateItem;
};

export default function ImportantDates({ locale, item }: ImportantDatesProps) {
  const title = locale === Locale.ko ? "주요 일정" : "Important Dates";

  return (
    <section
      className={`${locale === Locale.ko ? "sm:max-w-md" : "sm:max-w-lg"} mt-3 w-full rounded-none border border-gray-500 bg-white px-5 py-4 text-gray-900`}
    >
      <header className="mb-2">
        <h2 className="font-semibold uppercase text-gray-900">{title}</h2>
      </header>

      <div className="divide-y divide-gray-100">
        <div className="flex flex-col gap-1 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
          <div className="flex items-center gap-1">
            <span className="text-xs leading-none text-gray-800">▶</span>
            <span className="text-sm font-medium text-gray-900 md:text-[15px]">
              {item.title}
            </span>
          </div>
          <time
            className="text-sm font-semibold tracking-tight text-gray-900 md:text-[15px]"
            dateTime={new Date(item.dateStart).toISOString()}
          >
            {locale === Locale.ko
              ? formatKoreanDateRange(item.dateStart, item.dateEnd)
              : formatDateRange(item.dateStart, item.dateEnd, locale)}
          </time>
        </div>
      </div>
    </section>
  );
}
