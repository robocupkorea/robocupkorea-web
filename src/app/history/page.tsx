"use client";

import { eventContentData } from "@/data/eventContentData";
import { eventData } from "@/data/eventData";
import { formatDateRange } from "@/utils/date";

export default function HistoryPage() {
  return (
    <>
      <div className="bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">
              한국로보컵협회 연혁
            </h1>
            <p className="mt-4 text-lg text-gray-800">
              2013년부터 시작된 한국로보컵협회의 역사와 성장을 소개합니다
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
        <div className="mb-12 text-center">
          <p className="text-md mb-2 text-gray-500">연혁</p>
          <h2 className="text-3xl font-bold">한국로보컵협회가 걸어온 길</h2>
        </div>

        <div className="flex justify-center">
          <ol className="relative border-s border-gray-300">
            {eventData
              .slice()
              .reverse()
              .map((event, idx, arr) => {
                const content = eventContentData.find(
                  (c) => c.eventId === event.id,
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
                      {formatDateRange(event.dateStart, event.dateEnd)}
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

      <div className="bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
          <div className="mb-12 text-center">
            <p className="text-md mb-2 text-gray-500">주요 성과</p>
            <h2 className="text-3xl font-bold">지난 10년간의 주요 성과</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="border bg-white p-6">
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                대회 개최
              </h3>
              <p className="leading-relaxed text-gray-700">
                2013년부터 매년 정기적으로 로보컵 대회를 개최하여 국내 로봇
                교육의 발전에 기여하고 있습니다.
              </p>
            </div>

            <div className="border bg-white p-6">
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                참가자 확대
              </h3>
              <p className="leading-relaxed text-gray-700">
                초기 소수 참가자에서 현재 매회 500명 이상의 참가자들이 참여하는
                대규모 대회로 성장했습니다.
              </p>
            </div>

            <div className="border bg-white p-6">
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                교육원 인증
              </h3>
              <p className="leading-relaxed text-gray-700">
                전국 19개 이상의 교육원을 공식 인증하여 체계적인 로봇 교육
                프로그램을 제공하고 있습니다.
              </p>
            </div>

            <div className="border bg-white p-6">
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                국제 교류
              </h3>
              <p className="leading-relaxed text-gray-700">
                국제 로보컵 대회와의 연계를 통해 한국의 로봇 기술을 세계에
                알리고 있습니다.
              </p>
            </div>

            <div className="border bg-white p-6">
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                후원사 확대
              </h3>
              <p className="leading-relaxed text-gray-700">
                10개 이상의 기업과 기관이 후원하여 로봇 교육의 지속적인 발전을
                지원하고 있습니다.
              </p>
            </div>

            <div className="border bg-white p-6">
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                기술 발전
              </h3>
              <p className="leading-relaxed text-gray-700">
                로봇 공학과 인공지능 기술의 발전에 맞춰 다양한 리그와 미션을
                개발하여 제공하고 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
