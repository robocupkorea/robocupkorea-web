import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ko", "en"], // 지원하는 언어 리스트
  defaultLocale: "ko", // 기본 언어
  localePrefix: "as-needed", // 필요한 경우에만 언어 prefix 사용
  localeDetection: false, // 브라우저 언어 자동 감지 비활성화
});

export type Locale = (typeof routing.locales)[number]; // 지원하는 언어 리스트
