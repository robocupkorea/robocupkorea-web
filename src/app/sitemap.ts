import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://robocupkorea.org";
  const locales = ["ko", "en"];

  const pages = [
    "/",
    "/info/about",
    "/info/committee",
    "/info/history",
    "/info/learning-centers",
    "/info/sponsors",
    "/leagues",
    "/events",
    "/notices",
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  // 각 언어별로 사이트맵 생성
  locales.forEach((locale) => {
    pages.forEach((page) => {
      const url =
        locale === "ko" ? `${baseUrl}${page}` : `${baseUrl}/${locale}${page}`;

      sitemap.push({
        url,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: page === "/" ? 1 : 0.8,
      });
    });
  });

  return sitemap;
}
