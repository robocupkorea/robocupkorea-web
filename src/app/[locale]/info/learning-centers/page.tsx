import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";

import LearningCenterItem from "@/components/LearningCenterItem";
import { learningCenterData } from "@/data/learning-center-data";
import { LearningCenter } from "@/types/learning-center";

export default async function LearningCentersPage() {
  const locale = await getLocale();

  // 한국어만 허용하는 페이지
  if (locale !== "ko") {
    notFound();
  }

  const learningCenters = learningCenterData;

  return (
    <>
      <header className="bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
          <div className="text-center">
            <p className="text-md mb-2 break-keep text-gray-500">교육기관</p>
            <h1 className="break-keep text-4xl font-bold text-gray-900">
              한국로보컵협회 인증 교육기관
            </h1>
            <div className="flex justify-center">
              <p className="mt-4 max-w-3xl break-keep text-lg text-gray-800">
                본 교육원은 한국로보컵협회의 다양한 교육 및 실습 기회를
                제공하여, 청소년들이 로보컵을 통해 로봇 및 AI 관련 기술 능력과
                역량을 향상시킬 수 있도록 협회가 공식적으로 지원하는 교육
                기관입니다.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="container mx-auto max-w-7xl px-4 py-24 md:px-8 xl:px-20">
        <div className="mb-12 text-center">
          <p className="text-md mb-2 break-keep text-gray-500">전국 교육기관</p>
          <h2 id="centers-heading" className="break-keep text-3xl font-bold">
            전국 {learningCenters.length}개 인증 교육기관
          </h2>
          <p className="mt-4 text-gray-600">
            가까운 인증 교육기관을 찾아보세요
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {learningCenters.map((learningCenter: LearningCenter) => (
            <LearningCenterItem
              key={learningCenter.id}
              learningCenter={learningCenter}
            />
          ))}
        </div>
      </section>
    </>
  );
}
