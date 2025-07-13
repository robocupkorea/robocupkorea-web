import { useLocale } from "next-intl";

export default function EventStatus({ status }: { status: string }) {
  const locale = useLocale();

  switch (status) {
    case "UPCOMING":
      return (
        <span className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-2.5 py-1">
          <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
          <span className="text-sm font-medium text-green-700">
            {locale === "ko" ? "개최 예정" : "Upcoming"}
          </span>
        </span>
      );
    case "ONGOING":
      return (
        <span className="flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1">
          <div className="h-2.5 w-2.5 rounded-full bg-orange-500"></div>
          <span className="text-sm font-medium text-orange-700">
            {locale === "ko" ? "진행중" : "Ongoing"}
          </span>
        </span>
      );
    case "ENDED":
      return (
        <span className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1">
          <div className="h-2.5 w-2.5 rounded-full bg-gray-400"></div>
          <span className="text-sm font-medium text-gray-600">
            {locale === "ko" ? "종료" : "Ended"}
          </span>
        </span>
      );
    default:
      return null;
  }
}
