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
    NOTION_NOTICES_TABLE_ID: process.env.NOTION_NOTICES_TABLE_ID,
    NOTION_EVENTS_DB_ID: process.env.NOTION_EVENTS_DB_ID,
    NOTION_LEAGUES_DB_ID: process.env.NOTION_LEAGUES_DB_ID,
  },
};

export default nextConfig;
