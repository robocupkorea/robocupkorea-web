import { Locale } from "@/i18n/routing";

export interface Event {
  id: number;
  slug: string;
  year: string;
  dateStart: string;
  dateEnd: string;
}

/**
 * Event와 1:N 관계를 가지는 데이터
 */
export interface EventDetail {
  id: number;
  eventId: number; // Event id (Foreign Key)
  locale: Locale; // 언어
  title: string;
  location: string; // 간략한 위치
  address?: string; // 상세 주소
  posterImageUrl?: string;
  cmsPageId?: string; // Notion Page ID
  showInMain?: boolean; // 홈 페이지 랜딩에 표시 여부
  showInEvents?: boolean; // 이벤트 페이지에 표시 여부
}
