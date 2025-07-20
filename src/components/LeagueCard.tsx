"use client";

import { ArrowRightIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useLocale } from "next-intl";

import { Link } from "@/i18n/navigation";
import { League, LeagueDivision } from "@/types/leagues";

export default function LeagueCard({
  league,
  leagueDivision,
  fullWidth = true,
}: {
  league: League;
  leagueDivision: LeagueDivision;
  fullWidth?: boolean;
}) {
  const locale = useLocale();

  return (
    <article
      className={`group flex-shrink-0 border bg-white hover:bg-gray-100 ${fullWidth ? "w-full" : "w-[calc(100vw-6rem)] min-w-64 sm:w-64 md:w-72 lg:w-80"}`}
    >
      <Link
        href={`/leagues/${league.slug}/${leagueDivision.slug}`}
        className="block h-full"
      >
        <div className="relative h-40 w-full sm:h-48">
          <Image
            src={leagueDivision.imageUrl}
            alt={leagueDivision.name}
            fill
            sizes="(max-width: 640px) calc(100vw - 6rem), (max-width: 768px) 256px, (max-width: 1024px) 288px, 375px"
            className="object-cover"
            loading="lazy"
          />
        </div>

        <div className="p-4">
          <div className="mb-2">
            <h3
              id={`league-${leagueDivision.id}-title`}
              className="mt-0.5 line-clamp-2 text-lg font-bold text-gray-900"
            >
              {leagueDivision.name}
            </h3>
          </div>

          <div className="mt-4 flex items-center gap-1">
            <span className="text-sm font-medium text-gray-900">
              {locale === "ko" ? "자세히 보기" : "View Details"}
            </span>
            <ArrowRightIcon
              size={14}
              weight="regular"
              className="text-gray-900"
            />
          </div>
        </div>
      </Link>
    </article>
  );
}
