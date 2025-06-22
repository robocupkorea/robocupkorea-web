import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { routing } from "@/i18n/routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale; // 요청한 언어
  const locale = hasLocale(routing.locales, requested)
    ? requested // 요청한 언어가 있으면 요청한 언어로 설정
    : routing.defaultLocale; // 요청한 언어가 없으면 기본 언어로 설정

  return {
    locale, // 언어
    messages: { ...(await import(`@/messages/${locale}.json`)).default }, // 언어별 message
  };
});
