import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";

import "@/app/globals.css";
import { PostHogProvider } from "@/app/providers";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
// import WelcomeModal from "@/components/WelcomeModal";
import { routing } from "@/i18n/routing";
import { hasNewNoticePage } from "@/lib/notion/notices";
// import prisma from "@/lib/prisma";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const meta = messages.meta;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: meta.author }],
    other: {
      // 네이버 서치어드바이저
      "naver-site-verification": "054de8b6e7c7e246c12f1aa4454f1c27f2cec5b6",
    },
    openGraph: {
      title: meta.ogTitle,
      description: meta.ogDescription,
      type: meta.ogType,
      siteName: meta.ogSiteName,
      locale: locale,
      alternateLocale: locale === "ko" ? "en" : "ko",
      images: [
        {
          url: "https://media.robocupkorea.org/images/meta/og-image.jpg",
          width: 1200,
          height: 630,
          alt: meta.ogTitle,
        },
      ],
    },
    twitter: {
      card: meta.twitterCard,
      title: meta.twitterTitle,
      description: meta.twitterDescription,
      images: ["https://media.robocupkorea.org/images/meta/og-image.jpg"],
    },
  };
}

const pretendard = localFont({
  src: [
    {
      path: "../../assets/fonts/pretendard-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../assets/fonts/pretendard-regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../assets/fonts/pretendard-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../assets/fonts/pretendard-medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../assets/fonts/pretendard-semiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../assets/fonts/pretendard-semiBold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../assets/fonts/pretendard-bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../assets/fonts/pretendard-bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  preload: true,
  variable: "--font-pretendard",
});

interface RootLayoutProps {
  children: Readonly<React.ReactNode>;
  params: { locale: string };
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const hasNewNotice = await hasNewNoticePage(locale);

  // const mainEventDetail = await prisma.eventDetail.findFirst({
  //   where: { locale: locale, showInMain: true },
  //   include: { event: true },
  //   orderBy: { event: { dateStart: "desc" } }, // 최근 대회 중 첫번째
  // });

  return (
    <html lang={locale}>
      <body
        className={`${pretendard.variable} flex min-h-svh min-w-[375px] flex-col antialiased`}
      >
        <PostHogProvider>
          <NextIntlClientProvider messages={messages}>
            {/* <WelcomeModal mainEventDetail={mainEventDetail} /> */}
            <ScrollToTop />
            <Header hasNewNotice={hasNewNotice} />
            <main className="grow">{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
