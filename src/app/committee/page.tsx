"use client";

import { BuildingOfficeIcon, UserIcon } from "@phosphor-icons/react";

import { committeeMemberData } from "@/data/committeeMemberData";

export default function CommitteePage() {
  const members = committeeMemberData.filter(
    (member) => member.language === "ko-KR",
  );

  async function copyTextToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      alert("메일 주소가 복사되었습니다");
    } catch {
      alert(`메일 주소 복사에 실패했습니다: ${text}`);
    }
  }

  return (
    <>
      <div className="bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold">한국로보컵협회 위원회</h1>
            <p className="mx-auto max-w-2xl break-keep leading-relaxed text-gray-700">
              한국로보컵협회의 위원회는 양질의 다양한 AI·로봇 교육 제공에 뜻을
              같이 하는 교육 관련 종사자와 자원봉사자들로 구성된 비영리
              기관입니다.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
        <div className="mb-12 text-center">
          <p className="text-md mb-2 text-gray-500">구성원 소개</p>
          <h2 className="text-3xl font-bold">운영 위원회 구성원</h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="relative h-full w-full border bg-white p-6"
            >
              <div className="mb-6 flex items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                  <UserIcon
                    size={32}
                    weight="light"
                    className="text-gray-600"
                  />
                </div>
              </div>

              <div className="text-center">
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  {member.name}
                </h3>
                <p className="mb-4 text-sm font-medium text-gray-500">
                  {member.position}
                </p>
              </div>

              <div className="flex items-start gap-2">
                <div>
                  <BuildingOfficeIcon
                    size={16}
                    weight="fill"
                    className="mt-0.5 text-gray-500"
                  />
                </div>
                <p className="text-sm leading-relaxed text-gray-500">
                  {member.affiliation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
          <div className="mb-12 text-center">
            <p className="text-md mb-2 text-gray-500">문의하기</p>
            <h2 className="text-3xl font-bold text-gray-900">
              위원회에 문의하세요
            </h2>
          </div>

          <div className="text-center">
            <p className="mx-auto mb-8 max-w-2xl break-keep leading-relaxed text-gray-700">
              로보컵 대회나 협회 운영에 대한 문의사항이 있으시면 협회로
              문의해주세요.
            </p>
            <div className="mx-auto max-w-md">
              <div
                onClick={() => copyTextToClipboard("contact@robocupkorea.org")}
                className="inline-flex cursor-pointer items-center gap-2 border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50"
              >
                <span className="text-blue-700">contact@robocupkorea.org</span>
                <span className="text-sm text-gray-500">클릭하여 복사</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
