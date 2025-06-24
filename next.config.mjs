import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.robocupkorea.org",
        port: "",
        pathname: "/**",
      },
    ],
  },
  env: {
    NOTION_TOKEN: process.env.NOTION_TOKEN,
    NOTION_NOTICES_DATABASE_ID: process.env.NOTION_NOTICES_DATABASE_ID,
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
