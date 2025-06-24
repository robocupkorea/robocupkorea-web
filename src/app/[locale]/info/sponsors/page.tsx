import Image from "next/image";
import { getMessages } from "next-intl/server";

import sponsorBanner from "@/assets/images/sponsor-banner.jpg";
import SponsorContactButton from "@/components/SponsorContactButton";

export default async function SponsorsPage() {
  const { sponsors } = await getMessages();

  return (
    <>
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
        <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col items-start gap-10 px-4 py-12 md:px-8 xl:px-20">
          <p className="break-keep text-center text-base font-medium leading-relaxed text-white md:text-left">
            {sponsors.description1}
            <br />
            {sponsors.description2}
          </p>
          <SponsorContactButton
            email={sponsors.email}
            buttonText={sponsors.contactButton}
            copySuccess={sponsors.copySuccess}
            copyError={sponsors.copyError}
          />
        </div>
      </div>
    </>
  );
}
