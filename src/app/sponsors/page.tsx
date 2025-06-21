"use client";

import Image from "next/image";

import sponsorBanner from "@/assets/images/sponsor-banner.jpg";

export default function SponsorsPage() {
  async function copyTextToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      alert("메일 주소가 복사되었습니다. 메일로 문의해주세요.");
    } catch {
      alert(`메일 주소 복사에 실패했습니다: ${text}`);
    }
  }

  return (
    <div className="relative h-[calc(100svh-64px)] max-h-[1000px] w-full md:h-[calc(100svh-80px)]">
      <Image
        src={sponsorBanner}
        alt="Sponsor Banner"
        fill
        sizes="100vw"
        className="object-cover object-[center_20%]"
        priority
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative flex h-full w-full flex-col items-start gap-10 px-8 py-12">
        <p className="break-keep text-center text-base font-medium leading-relaxed text-white md:text-left">
          한국로보컵협회는 2013년부터 10년 이상 로보컵 대회를 운영해 온 비영리
          단체입니다.
          <br />
          모든 후원금은 로봇 꿈나무들을 양성하고 AI 및 로보틱스 교육의 증진을
          위한 다양한 목적에 사용됩니다.
        </p>
        <div className="flex w-full justify-center md:justify-start">
          <button
            onClick={() => copyTextToClipboard("contact@robocupkorea.org")}
            className="flex h-12 items-center justify-center gap-1.5 border border-white bg-transparent px-6 font-medium text-white hover:bg-white/10"
          >
            후원 문의하기
          </button>
        </div>
      </div>
    </div>
  );
}
