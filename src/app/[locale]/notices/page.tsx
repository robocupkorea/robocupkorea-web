import { getMessages } from "next-intl/server";

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
  const noticesData = await getNotices();

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
                <th scope="col" className="w-16 p-4">
                  {notices.table.number}
                </th>
                <th scope="col" className="flex-1 p-4">
                  {notices.table.title}
                </th>
                <th scope="col" className="w-24 p-4 text-right">
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
                noticesData?.map((notice, index) => (
                  <tr key={notice.id} className="border-b hover:bg-gray-100">
                    <td className="w-16 p-4 text-sm text-gray-500">
                      {noticesData.length - index}
                    </td>
                    <td className="flex-1 p-4">
                      <Link
                        href={`/notices/${notice.id}`}
                        className="block truncate font-medium text-gray-800 hover:text-blue-600"
                      >
                        {notice.title}
                      </Link>
                    </td>
                    <td className="w-24 p-4 text-right text-sm text-gray-500">
                      {formatISODate(notice.createdAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
