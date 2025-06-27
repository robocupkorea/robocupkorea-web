import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/info/about",
          "/info/committee",
          "/info/history",
          "/info/learning-centers",
          "/info/sponsors",
          "/leagues",
          "/events",
          "/notices",
        ],
      },
    ],
    sitemap: "https://robocupkorea.org/sitemap.xml",
  };
}
