import Link from "next/link";

import { getNotices } from "@/lib/notion/notices";
import { formatISODate } from "@/utils/date";

export default async function NoticesPage() {
  const notices = await getNotices();

  return (
    <>
      <div className="bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">공지사항</h1>
            <p className="mt-4 text-lg text-gray-800">
              한국로보컵협회의 대회 소식, 업데이트 등을 확인하세요
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
        <div className="overflow-x-auto">
          <div className="min-w-full border-t border-gray-200">
            <div className="flex bg-gray-50 text-left text-sm font-semibold text-gray-600">
              <div className="w-24 p-4">번호</div>
              <div className="flex-1 p-4">제목</div>
              <div className="w-40 p-4 text-right">작성일</div>
            </div>

            {notices?.length === 0 ? (
              <div className="flex justify-center py-8">
                <div className="text-gray-600">공지사항이 없습니다.</div>
              </div>
            ) : (
              <div>
                {notices?.map((notice, index) => (
                  <Link
                    key={notice.id}
                    href={`/notices/${notice.id}`}
                    className="flex cursor-pointer border-b hover:bg-gray-100"
                  >
                    <div className="w-24 p-4 text-sm text-gray-500">
                      {notices.length - index}
                    </div>
                    <div className="flex-1 p-4 font-medium text-gray-800">
                      {notice.title}
                    </div>
                    <div className="w-40 p-4 text-right text-sm text-gray-500">
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
