import { Locale } from "@/i18n/routing";

export interface League {
  id: number;
  slug: string; // 경로로 사용, unique 필요
  name: string;
}

export interface LeagueDivision {
  id: number;
  leagueId: number;
  locale: Locale;
  slug: string; // league와 조합하여 경로로 사용, unique 불필요
  name: string;
  imageUrl: string;
  cmsPageId: string; // Notion 페이지 ID
}
