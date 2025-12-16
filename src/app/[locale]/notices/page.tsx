import {
  DotOutlineIcon,
  FileIcon,
  MegaphoneIcon,
  TicketIcon,
} from "@phosphor-icons/react/dist/ssr";
import { getLocale, getMessages } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { getNotices } from "@/lib/notion/notices";
import { formatISODate } from "@/utils/date";

export async function generateMetadata() {
  const { notices } = await getMessages();

  return {
    title: notices.meta.title,
    description: notices.meta.description,
  };
}

export default async function NoticesPage() {
  const { notices } = await getMessages();
  const locale = await getLocale();
  const noticesData = await getNotices(locale);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;

  return (
    <>
      <header className="bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
          <div className="text-center">
            <h1 className="break-keep text-4xl font-bold text-gray-900">
              {notices.title}
            </h1>
            <p className="mt-4 break-keep text-lg text-gray-800">
              {notices.subtitle}
            </p>
          </div>
        </div>
      </header>

      <section className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
        <div className="overflow-x-auto">
          <table className="min-w-full border-t border-gray-200">
            <thead>
              <tr className="bg-gray-50 text-left text-sm font-semibold text-gray-600">
                <th scope="col" className="min-w-16 p-4">
                  {notices.table.number}
                </th>
                <th scope="col" className="flex-1 p-4">
                  {notices.table.title}
                </th>
                <th scope="col" className="min-w-24 p-4 text-right">
                  {notices.table.date}
                </th>
              </tr>
            </thead>
            <tbody>
              {noticesData?.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-8 text-center">
                    <div className="text-gray-600">{notices.noNotices}</div>
                  </td>
                </tr>
              ) : (
                noticesData?.map((notice, index) => {
                  const noticeDate = new Date(notice.date);
                  noticeDate.setHours(0, 0, 0, 0);
                  const daysDiff = today.getTime() - noticeDate.getTime();
                  const isWithinSevenDays =
                    daysDiff >= 0 && daysDiff <= sevenDaysInMs;

                  return (
                    <tr key={notice.id} className="border-b hover:bg-gray-100">
                      <td className="relative min-w-16 p-4 text-sm tabular-nums text-gray-500">
                        <span className="relative">
                          {noticesData.length - index}
                          {isWithinSevenDays ? (
                            <span className="absolute -right-[20px] -top-[12px] text-red-600">
                              <DotOutlineIcon size={28} weight="fill" />
                            </span>
                          ) : null}
                        </span>
                      </td>
                      <td className="flex-1 p-4">
                        <Link
                          href={`/notices/${notice.id}`}
                          className="relative block flex items-center truncate font-medium text-gray-800"
                        >
                          {notice.type === "Announcement" ? (
                            <span className="mr-2 inline-block shrink-0 text-gray-600">
                              <MegaphoneIcon size={16} />
                            </span>
                          ) : notice.type === "Registration" ? (
                            <span className="mr-2 inline-block shrink-0 text-gray-600">
                              <TicketIcon size={16} />
                            </span>
                          ) : notice.type === "Rules" ? (
                            <span className="mr-2 inline-block shrink-0 text-gray-600">
                              <FileIcon size={16} />
                            </span>
                          ) : null}
                          {notice.title}
                        </Link>
                      </td>
                      <td className="min-w-24 p-4 text-right text-sm tabular-nums tracking-tight">
                        {formatISODate(notice.date)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
