import Image from "next/image";
import { getMessages } from "next-intl/server";

import antiCorruption from "@/assets/images/anti-corruption-and-civil-rights-commission.png";
import ministryOfTradeIndustryAndEnergy from "@/assets/images/ministry-of-trade-industry-and-energy.png";
import nationalTaxService from "@/assets/images/national-tax-service.png";
import CreditsButton from "@/components/CreditsButton";

export default async function Footer() {
  const { footer } = await getMessages();

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
              alt={footer.sponsors.ministryOfTradeIndustryAndEnergy}
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
              alt={footer.sponsors.nationalTaxService}
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
              alt={footer.sponsors.antiCorruption}
              className="mb-2 h-12 w-auto"
            />
          </a>
        </div>
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="text-sm leading-relaxed text-black">
            <p className="mb-1 font-bold">
              {footer.organization}
              <span className="ml-2 font-normal">{footer.address}</span>
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
