import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";

import "@/app/globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { routing } from "@/i18n/routing";

import "highlight.js/styles/github.css";

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
    openGraph: {
      title: meta.ogTitle,
      description: meta.ogDescription,
      type: meta.ogType,
      siteName: meta.ogSiteName,
      locale: locale,
      alternateLocale: locale === "ko" ? "en" : "ko",
    },
    twitter: {
      card: meta.twitterCard,
      title: meta.twitterTitle,
      description: meta.twitterDescription,
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
        {
          url: "/web-app-manifest-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          url: "/web-app-manifest-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
      apple: "/apple-touch-icon.png",
    },
  };
}

export const pretendard = localFont({
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

  return (
    <html lang={locale}>
      <body
        className={`${pretendard.variable} min-h-svh min-w-[375px] antialiased`}
      >
        <ScrollToTop />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="grow">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
