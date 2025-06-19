"use client";

import Image from "next/image";
import { useState } from "react";

import antiCorruption from "@/assets/images/anti-corruption-and-civil-rights-commission.png";
import ministryOfTradeIndustryAndEnergy from "@/assets/images/ministry-of-trade-industry-and-energy.png";
import nationalTaxService from "@/assets/images/national-tax-service.png";
import CreditsModal from "@/components/CreditsModal";

export default function Footer() {
  const [isCreditsOpen, setCreditsOpen] = useState(false); // 크레딧 모달

  return (
    <footer className="bg-white py-20">
      <div className="container mx-auto flex max-w-7xl flex-col justify-center gap-8 px-4 md:px-8 xl:px-20">
        <div className="flex flex-wrap items-center gap-2">
          <a
            href="https://www.motie.go.kr/"
            target="_blank"
            rel="noreferrer"
            className="cursor-pointer hover:opacity-80"
          >
            <Image
              src={ministryOfTradeIndustryAndEnergy}
              alt="산업통상자원부"
              className="mb-2 h-12 w-auto"
            />
          </a>
          <a
            href="https://www.nts.go.kr/"
            target="_blank"
            rel="noreferrer"
            className="cursor-pointer hover:opacity-80"
          >
            <Image
              src={nationalTaxService}
              alt="국세청"
              className="mb-2 h-12 w-auto"
            />
          </a>
          <a
            href="https://www.acrc.go.kr/"
            target="_blank"
            rel="noreferrer"
            className="cursor-pointer hover:opacity-80"
          >
            <Image
              src={antiCorruption}
              alt="국민권익위원회"
              className="mb-2 h-12 w-auto"
            />
          </a>
        </div>
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="text-sm leading-relaxed text-black">
            <p className="mb-1 font-bold">
              한국로보컵협회
              <span className="ml-2 font-normal">
                (06732) 서울시 서초구 서운로 13 중앙로얄 오피스텔 1308 TEL.
                070-4247-7485
              </span>
            </p>
            <p>COPYRIGHT ©한국로보컵협회. ALL RIGHT RESERVED.</p>
          </div>
          <div>
            <button
              onClick={() => setCreditsOpen(true)}
              className="text-sm underline hover:text-blue-600"
            >
              Credits
            </button>
          </div>
        </div>
      </div>

      <CreditsModal
        isOpen={isCreditsOpen}
        onClose={() => setCreditsOpen(false)}
      />
    </footer>
  );
}
