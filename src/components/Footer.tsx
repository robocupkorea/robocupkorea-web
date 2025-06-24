import Image from "next/image";
import { getLocale, getMessages } from "next-intl/server";

import antiCorruptionEn from "@/assets/images/en/anti-corruption-and-civil-rights-commission.png";
import ministryOfTradeIndustryAndEnergyEn from "@/assets/images/en/ministry-of-trade-industry-and-energy.png";
import nationalTaxServiceEn from "@/assets/images/en/national-tax-service.png";
import antiCorruptionKo from "@/assets/images/ko/anti-corruption-and-civil-rights-commission.png";
import ministryOfTradeIndustryAndEnergyKo from "@/assets/images/ko/ministry-of-trade-industry-and-energy.png";
import nationalTaxServiceKo from "@/assets/images/ko/national-tax-service.png";
import CreditsButton from "@/components/CreditsButton";

export default async function Footer() {
  const locale = await getLocale();

  const { footer } = await getMessages();

  // locale에 따라 이미지 선택
  const images =
    locale === "ko"
      ? {
          antiCorruption: antiCorruptionKo,
          ministryOfTradeIndustryAndEnergy: ministryOfTradeIndustryAndEnergyKo,
          nationalTaxService: nationalTaxServiceKo,
        }
      : {
          antiCorruption: antiCorruptionEn,
          ministryOfTradeIndustryAndEnergy: ministryOfTradeIndustryAndEnergyEn,
          nationalTaxService: nationalTaxServiceEn,
        };

  return (
    <footer className="bg-white py-20">
      <div className="container mx-auto flex max-w-7xl flex-col justify-center gap-6 px-4 md:px-8 xl:px-20">
        <div className="flex flex-wrap items-center gap-2">
          <a
            href="https://www.motie.go.kr/"
            target="_blank"
            rel="noreferrer"
            className="cursor-pointer hover:opacity-80"
          >
            <Image
              src={images.ministryOfTradeIndustryAndEnergy}
              alt={footer.sponsors.ministryOfTradeIndustryAndEnergy}
              className="mb-2 h-10 w-auto md:h-11"
              width={145}
              height={48}
            />
          </a>
          <a
            href="https://www.nts.go.kr/"
            target="_blank"
            rel="noreferrer"
            className="cursor-pointer hover:opacity-80"
          >
            <Image
              src={images.nationalTaxService}
              alt={footer.sponsors.nationalTaxService}
              className="mb-2 h-10 w-auto md:h-11"
              width={94}
              height={48}
            />
          </a>
          <a
            href="https://www.acrc.go.kr/"
            target="_blank"
            rel="noreferrer"
            className="cursor-pointer hover:opacity-80"
          >
            <Image
              src={images.antiCorruption}
              alt={footer.sponsors.antiCorruption}
              className="mb-2 h-10 w-auto md:h-11"
              width={181}
              height={48}
            />
          </a>
        </div>
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="space-y-4 text-sm leading-relaxed text-black">
            <p className="break-keep max-md:flex max-md:flex-col max-md:gap-1 md:space-x-3">
              <span className="font-bold">{footer.organization}</span>
              <span className="font-normal">{footer.address}</span>
              <span className="font-normal text-gray-500">{footer.tel}</span>
            </p>
            <p>{footer.copyright}</p>
          </div>
          <div>
            <CreditsButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
