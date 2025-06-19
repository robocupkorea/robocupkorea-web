import { Language } from "@/types/language.types";

export interface EventContentData {
  id: number;
  eventId: number;
  language: Language;
  title: string;
  location: string; // 간략한 위치
  address?: string; // 상세 주소
  poster_image_url?: string;
  banner_image_url?: string;
  showInMain?: boolean;
  showInEventPage?: boolean;
}

/*
 * TODO: event_translation 데이터베이스 구조 참고
 *
 * CREATE TABLE event_translation (
 *   id         INT AUTO_INCREMENT PRIMARY KEY,
 *   event_id   INT NOT NULL,
 *   language   VARCHAR(5) NOT NULL,
 *   title      VARCHAR(255) NOT NULL,
 *   location   VARCHAR(255) NOT NULL,
 *   address    VARCHAR(255),
 *   poster_image_url VARCHAR(255),
 *   banner_image_url VARCHAR(255),
 *   show_in_main BOOLEAN DEFAULT FALSE,
 *   is_event_page BOOLEAN DEFAULT FALSE,
 *   PRIMARY KEY (language, id)
 * ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
 */

export const eventContentData: EventContentData[] = [
  {
    id: 1,
    eventId: 1,
    language: "ko-KR",
    title: "제1회 한국로보컵 주니어 대회",
    location: "롯대백화점 평촌점",
  },
  {
    id: 2,
    eventId: 2,
    language: "ko-KR",
    title: "제2회 한국로보컵 주니어 대회",
    location: "일산 킨텍스 제1전시장",
  },
  {
    id: 3,
    eventId: 3,
    language: "ko-KR",
    title: "제3회 한국로보컵 주니어 오픈",
    location: "일산 킨텍스 제1전시장",
  },
  {
    id: 4,
    eventId: 4,
    language: "ko-KR",
    title: "제4회 한국로보컵 오픈",
    location: "대구 북구 엑스코",
  },
  {
    id: 5,
    eventId: 5,
    language: "ko-KR",
    title: "제1회 한국창의코딩대회",
    location: "대전 한밭대학교",
  },
  {
    id: 6,
    eventId: 6,
    language: "ko-KR",
    title: "제5회 한국로보컵오픈",
    location: "대구 엑스코",
  },
  {
    id: 7,
    eventId: 7,
    language: "ko-KR",
    title: "제2회 한국창의코딩대회",
    location: "대전 한밭대학교",
  },
  {
    id: 8,
    eventId: 8,
    language: "ko-KR",
    title: "제6회 한국로보컵오픈",
    location: "서울 국민대학교",
  },
  {
    id: 9,
    eventId: 9,
    language: "ko-KR",
    title: "제7회 한국로보컵오픈",
    location: "원주 오크밸리",
  },
  {
    id: 10,
    eventId: 10,
    language: "ko-KR",
    title: "제8회 한국로보컵오픈",
    location: "온라인",
  },
  {
    id: 11,
    eventId: 11,
    language: "ko-KR",
    title: "제9회 한국로보컵오픈",
    location: "평창 용평리조트",
  },
  {
    id: 12,
    eventId: 12,
    language: "ko-KR",
    title: "제3회 한국창의코딩대회",
    location: "구리시체육관",
  },
  {
    id: 13,
    eventId: 13,
    language: "ko-KR",
    title: "제10회 한국로보컵오픈",
    location: "평창 용평리조트",
  },
  {
    id: 14,
    eventId: 14,
    language: "ko-KR",
    title: "로보컵 아시아퍼시픽 평창",
    location: "평창 알펜시아리조트",
  },
  {
    id: 15,
    eventId: 15,
    language: "ko-KR",
    title: "제4회 한국창의코딩대회",
    location: "춘천 호반체육관",
  },
  {
    id: 16,
    eventId: 16,
    language: "ko-KR",
    title: "제11회 한국로보컵오픈",
    location: "평창 용평리조트",
  },
  {
    id: 17,
    eventId: 17,
    language: "ko-KR",
    title: "제5회 한국창의코딩대회",
    location: "춘천 호반체육관",
  },
  {
    id: 18,
    eventId: 18,
    language: "ko-KR",
    title: "제12회 한국로보컵오픈",
    location: "평창 알펜시아리조트",
  },
  {
    id: 19,
    eventId: 19,
    language: "ko-KR",
    title: "제13회 한국로보컵오픈",
    location: "평창 알펜시아리조트",
    poster_image_url:
      "https://media.robocupkorea.org/images/events/robocup-south-korea-open/2025/ko/poster.jpg",
    banner_image_url:
      "https://media.robocupkorea.org/images/events/robocup-south-korea-open/2025/ko/banner.jpg",
    showInEventPage: true,
  },
  {
    id: 20,
    eventId: 20,
    language: "ko-KR",
    title: "제6회 한국창의코딩대회",
    location: "평창 알펜시아리조트",
    address: "강원특별자치도 평창군 알펜시아리조트 컨벤션센터",
    showInMain: true,
  },
];
