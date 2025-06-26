import { getMessages } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { getNotices } from "@/lib/notion/notices";
import { formatISODate } from "@/utils/date";

export default async function NoticesPage() {
  const { notices } = await getMessages();
  const noticesData = await getNotices();

  return (
    <>
      <div className="bg-gray-50">
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
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
        <div className="overflow-x-auto">
          <div className="min-w-full border-t border-gray-200">
            <div className="flex bg-gray-50 text-left text-sm font-semibold text-gray-600">
              <div className="w-16 p-4">{notices.table.number}</div>
              <div className="flex-1 p-4">{notices.table.title}</div>
              <div className="w-24 p-4 text-right">{notices.table.date}</div>
            </div>

            {noticesData?.length === 0 ? (
              <div className="flex justify-center py-8">
                <div className="text-gray-600">{notices.noNotices}</div>
              </div>
            ) : (
              <div>
                {noticesData?.map((notice, index) => (
                  <Link
                    key={notice.id}
                    href={`/notices/${notice.id}`}
                    className="flex cursor-pointer border-b hover:bg-gray-100"
                  >
                    <div className="w-16 p-4 text-sm text-gray-500">
                      {noticesData.length - index}
                    </div>
                    <div className="flex-1 truncate p-4 font-medium text-gray-800">
                      {notice.title}
                    </div>
                    <div className="w-24 p-4 text-right text-sm text-gray-500">
                      {formatISODate(notice.createdAt)}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
